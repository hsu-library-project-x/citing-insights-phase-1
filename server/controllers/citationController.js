var citationModel = require('../models/citationModel.js');

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
        citationModel.findOne({_id: id}, function (err, citation) {
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
  			author : req.body.author,
  			date : req.body.date,
  			editor : req.body.editor,
  			edition : req.body.edition,
  			volume : req.body.volume,
  			pages : req.body.pages,
  			type : req.body.type,
  			title : req.body.title,
  			annotation : req.body.annotation,
  			doi : req.body.doi,
  			paper_id : req.body.paper_id

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
        citationModel.findOne({_id: id}, function (err, citation) {
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

    //called by Rubric Submit, sets empty array to correct Scores
    add_rubric_score: function(req, res){
        console.log(req.body);
        var id = req.params.id;
        citationModel.findOne({_id: id}, function (err, citation) {
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

            citation.rubricScore = req.body.rubricScore ? req.body.rubricScore : citation.rubricScore;
      
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

    add_intext_citations: function(req, res){
      console.log(req.body);
      var id = req.params.id;
      citationModel.findOne({_id: id}, function (err, citation) {
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

          citation.intextCitations = req.body.intextCitations ? req.body.intextCitations : citation.intextCitations;
    
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

    add_annotation: function(req, res){
      console.log(req.body);
      var id = req.params.id;
      citationModel.findOne({_id: id}, function (err, citation) {
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

          citation.annotation = req.body.annotation ? req.body.annotation : citation.annotation;
    
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
