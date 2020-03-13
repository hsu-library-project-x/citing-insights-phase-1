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

  
  remove_assessment: function (req, res) {
    var id = req.params.id;

    //Removes assessment from array
    citationModel.findOneAndUpdate(
      { _id: id },
      { $pull: { assessments: { rubric_id: req.body.rubric_id } } },
      { new: true },
      function (err, val) {
        if (err) {
          return res.status(500).json({
            message: 'Could not remove field from array',
            error: err
          });
        }
        return res.status(200).json({
          message: 'Updated array successfully'
        });
      });
  },

  add_assessment: function (req, res) {
    var id = req.params.id;

    //Find the current citation
    citationModel.findById({_id: id}, function (err, citation) {
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

      //Get new assessment ready
      let new_assessment = {
        'rubric_id': req.body.rubric_id,
        'rubric_score': req.body.rubric_score,
        'rubric_title': req.body.rubric_title,
        'annotation': req.body.annotation
      };

      //Push new item onto array
      citation.assessments.push(new_assessment);
      citation.evaluated = true;

      //Save to DB
      citation.save(function (err, citation) {
        if (err) {
          return res.status(500).json({
            message: 'Error when updating citation.',
            error: err
          });
        }
        return res.status(201).json(citation);
      });
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
