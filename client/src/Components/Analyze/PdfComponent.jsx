import React, { Component } from "react";
import { Document, Page, Outline, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "./pdfComponent.css";

pdfjs.GlobalWorkerOptions.workerSrc =
  `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

//Highlights what was searched
const highlightPattern = (text, pattern) => {
  const splitText = text.split(pattern);

  if (splitText.length <= 1) {
    return text;
  }

  const matches = text.match(pattern);

  return splitText.reduce((arr, element, index) => (matches[index] ? [
    ...arr,
    element,
    <mark>
      {matches[index]}
    </mark>,
  ] : [...arr, element]), []);
};

//Fixes the offset for text highlighting
function removeTextLayerOffset() {
  const textLayers = document.querySelectorAll(".react-pdf__Page__textContent");
  textLayers.forEach(layer => {
    const { style } = layer;
    style.top = "0";
    style.left = "0";
    style.transform = "";
    style.margin = "auto";
  });
}

class PdfComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numPages: null,
      pageNumber: this.props.pageNumber,
      searchText: '',
      pdf: new Blob([this.props.data], { type: "application/pdf;base64" }),
      scale: 1.0
    }
  }


  componentWillReceiveProps(nextProps) {

    let bytes = new Uint8Array(nextProps.data);
    let blob = new Blob([bytes], { type: "application/pdf;base64" });

    this.setState({ 
      pdf: blob 
    })
  }

  onDocumentLoadSuccess = (document) => {
    const { numPages } = document;
    this.setState({
      numPages,
      pageNumber: 1,
    });
  };

  render() {
    const { numPages } = this.state;
    const { pageNumber, searchText, scale } = this.props;

    return (
      <div className="document-wrapper">
        <Document
          file={this.state.pdf}
          onLoadSuccess={this.onDocumentLoadSuccess}
        >
          <Page
            className="pdf-viewer"
            onLoadSuccess={removeTextLayerOffset}
            pageNumber={pageNumber}
            scale={scale}
          />
        </Document>
      </div>
    );
  }
}

export default PdfComponent;