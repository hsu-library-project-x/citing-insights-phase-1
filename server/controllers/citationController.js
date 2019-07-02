var citationModel = require('../models/citationModel.js');
const request = require('request');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


function Get(yourUrl){
  var Httpreq = new XMLHttpRequest(); // a new request
  Httpreq.open("GET",yourUrl,false);
  Httpreq.send(null);
  return Httpreq.responseText;
}

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

  s2: function (req, res) {
    var id = req.params.id;
    console.log('s2');
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

      var author_name = "";
      if (citation.author.length > 0 && "given" in citation.author[0]) {
        author_name = citation.author[0]["given"];
      }
      var title_name = "";
      if (citation.title.length > 0) {
        title_name = citation.title[0];
      }

      var json_obj = JSON.parse(Get("https://api.crossref.org/works?query.author=" + author_name + "&query.title=" + title_name ));

      //console.log("this is the DOI: "+ json_obj.message.items[0].DOI);

      if (json_obj.message.items != undefined) { 
        var doi = json_obj.message.items[0].DOI;

        var final_var = JSON.parse(Get("http://api.semanticscholar.org/v1/paper/" + doi));

        console.log(final_var.citationVelocity);
        if (final_var.citationVelocity != undefined) {
            return res.json({ "citation_velocity": final_var.citationVelocity, "influential_citation_count": final_var.influentialCitationCount})
        } else {
            return res.json({ "error": "citation not found"  });
        }
      } else {
        return res.json({ "error": "citation not found"  });
      }
      //return res.json(citation);
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
