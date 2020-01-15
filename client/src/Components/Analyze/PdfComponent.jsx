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
      pageNumber: 1,
      searchText: '',
      pdf: new Blob([this.props.data], { type: "application/pdf;base64" }),
      scale: 1.0
    }
  }


  componentWillReceiveProps(nextProps) {

    let bytes = new Uint8Array(nextProps.data);
    let blob = new Blob([bytes], { type: "application/pdf;base64" });

    this.setState({ pdf: blob })
  }

  makeTextRenderer = searchText => textItem => highlightPattern(textItem.str, searchText);

  onChange = event => this.setState({ searchText: event.target.value });

  onItemClick = ({ pageNumber }) => this.setState({ pageNumber });

  onDocumentLoadSuccess = (document) => {
    const { numPages } = document;
    this.setState({
      numPages,
      pageNumber: 1,
    });
  };

  changePage = offset => this.setState(prevState => ({
    pageNumber: prevState.pageNumber + offset,
  }));

  changeScale = offset => this.setState(prevState => ({
    scale: prevState.scale + offset,
  })); 

  previousPage = () => this.changePage(-1);

  nextPage = () => this.changePage(1);

  zoomIn = () => this.changeScale(0.25);
  
  zoomOut = () => this.changeScale(-0.25);


  render() {
    const { numPages, pageNumber, searchText, scale } = this.state;

    return (
      <div className="document-wrapper">
        <Document
          file={this.state.pdf}
          onLoadSuccess={this.onDocumentLoadSuccess}
        >
           <div className="zoom-controls">
            <button disabled={scale <= 0.1} onClick={this.zoomOut} type="button">
             -
            </button>
            Zoom
            <button disabled={scale >= 6.0} onClick={this.zoomIn} type="button" >
             +
           </button>
          </div>
          <div className="page-controls">
            <button disabled={pageNumber <= 1} onClick={this.previousPage} type="button">
              Previous
            </button>
            {` Page ${pageNumber || (numPages ? 1 : '--')} of ${numPages || '--'} `}
            <button disabled={pageNumber >= numPages} onClick={this.nextPage} type="button" >
              Next
           </button>
          </div>
          <Page
            className="pdf-viewer"
            onLoadSuccess={removeTextLayerOffset}
            pageNumber={pageNumber}
            customTextRenderer={this.makeTextRenderer(searchText)}
            scale={scale}
          />

          <Outline className="outline-list" onItemClick={this.onItemClick} />
        </Document>
      </div>
    );
  }
}

export default PdfComponent;
