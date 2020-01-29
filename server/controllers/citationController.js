var citationModel = require('../models/citationModel.js');
// const request = require('request');
// var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

/**
 * citationController.js
 *
 * @description :: Server-side logic for managing citations.
 */
module.exports = {

  /**
   * citationController.list()
   */
  list: function (req, res) {
    citationModel.find(function (err, citations) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting citation.',
          error: err
        });
      }
      return res.json(citations);
    });
  },

  /**
   * citationController.show()
   */
  show: function (req, res) {
    var id = req.params.id;
    citationModel.findOne({ _id: id }, function (err, citation) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting citation.',
          error: err
        });
      }
      if (!citation) {
        return res.status(404).json({
          message: 'No such citation'
        });
      }
      return res.json(citation);
    });
  },

  by_user_id: function (req, res) {

    var user_id = req.parans.user_id;
    citationModel.findOne({ _user_id })
  },


  by_paper_id: function (req, res) {
    var id = req.params.id;
    citationModel.find({ paper_id: id }, function (err, citation) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting citation.',
          error: err
        });
      }
      if (!citation) {
        return res.status(404).json({
          message: 'No such citation'
        });
      }
      return res.json(citation);
    });
  },

  /**
   * citationController.create()
   */
  create: function (req, res) {
    var citation = new citationModel({
      author: req.body.author,
      date: req.body.date,
      editor: req.body.editor,
      edition: req.body.edition,
      volume: req.body.volume,
      pages: req.body.pages,
      type: req.body.type,
      title: req.body.title,
      annotation: req.body.annotation,
      doi: req.body.doi,
      paper_id: req.body.paper_id

    });

    citation.save(function (err, citation) {
      if (err) {
        return res.status(500).json({
          message: 'Error when creating citation',
          error: err
        });
      }
      return res.status(201).json(citation);
    });
  },

  /**
   * citationController.update()
   */
  update: function (req, res) {
    var id = req.params.id;
    citationModel.findOne({ _id: id }, function (err, citation) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting citation',
          error: err
        });
      }
      if (!citation) {
        return res.status(404).json({
          message: 'No such citation'
        });
      }

      citation.author = req.body.author ? req.body.author : citation.author;
      citation.date = req.body.date ? req.body.date : citation.date;
      citation.editor = req.body.editor ? req.body.editor : citation.editor;
      citation.edition = req.body.edition ? req.body.edition : citation.edition;
      citation.volume = req.body.volume ? req.body.volume : citation.volume;
      citation.pages = req.body.pages ? req.body.pages : citation.pages;
      citation.type = req.body.type ? req.body.type : citation.type;
      citation.title = req.body.title ? req.body.title : citation.title;
      citation.annotation = req.body.annotation ? req.body.annotation : citation.annotation;
      citation.doi = req.body.doi ? req.body.doi : citation.doi;
      citation.paper_id = req.body.paper_id ? req.body.paper_id : citation.paper_id;

      citation.save(function (err, citation) {
        if (err) {
          return res.status(500).json({
            message: 'Error when updating citation.',
            error: err
          });
        }

        return res.json(citation);
      });
    });
  },

  add_assessment: function (req, res) {
    var id = req.params.id;
    citationModel.findById(id, function (err, citation) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting citation',
          error: err
        });
      }
      if (!citation) {
        return res.status(404).json({
          message: 'No such citation'
        });
      }

      // Check to see if assessment has already been made for this rubric
      let assessments = citation.assessments;

      let new_assessment = {
        'rubric_id': req.body.rubric_id,
        'rubric_index': req.body.rubric_index,
        'annotation': req.body.annotation
      }

      //Test for empty array
      if (citation.assessments.length === 0) {
        console.log(`array was empty, citation: ${citation}`)
        citation.assessments.push(new_assessment);
        citation.evaluated = true;

        citation.save(function (err, citation) {
          if (err) {
            return res.status(500).json({
              message: 'Error when updating citation.',
              error: err
            });
          }
          return res.status(201).json(citation);
        });
      } else {

        let check = '';

        //Test to see if rubric has already been used for this citation
        for (index in assessments) {
          if (assessments[index].rubric_id.equals(req.body.rubric_id)) {
            check = 'exists';
          } else {
            check = 'does not exist';
          }
        }
        if (check === 'exists') {
          return res.status(304).json({
            message: 'Rubric assessment already exists.'
          });
        } else {

          citation.assessments.push(new_assessment);

          citation.evaluated = true;

          citation.save(function (err, citation) {
            if (err) {
              return res.status(500).json({
                message: 'Error when updating citation.',
                error: err
              });
            }
            return res.status(201).json(citation);
          });
        }
      }
    });
  },

  find_evaluations: function (req, res) {

    var paper_id = req.params.paper_id;
    citationModel.find({ paper_id: paper_id, evaluated: true }, function (err, citation) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting citation',
          error: err
        });
      }
      if (!citation) {
        return res.status(404).json({
          message: 'No Evaluations Found'
        });
      }
      return res.json(citation);
    })
  },

  /**
   * citationController.remove()
   */
  remove: function (req, res) {
    var id = req.params.id;
    citationModel.findByIdAndRemove(id, function (err, citation) {
      if (err) {
        return res.status(500).json({
          message: 'Error when deleting the citation.',
          error: err
        });
      }
      return res.status(204).json();
    });
  }
};
