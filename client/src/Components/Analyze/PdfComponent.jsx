import React, { Component } from "react";
import { Document, Page, Outline, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";


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
      pdf: new Blob([this.props.data], { type: "application/pdf;base64" })
      //will put paper here, passed in as prop
      //paper: this.props.paper (or something)
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

  previousPage = () => this.changePage(-1);

  nextPage = () => this.changePage(1);

  render() {
    const { numPages, pageNumber, searchText } = this.state;

    return (
      <div>
        <div className="pdfInfo">
          <p className="pdfPage">
            Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
          </p>
{/* 
          <form role="search">
            <label htmlFor="search">Search:</label>
            <input placeholder="Begin typing..." className="pdfSearch" type="search" id="search" value={searchText} onChange={this.onChange} />
          </form> */}
          <button className="pdfButtons" type="button" disabled={pageNumber <= 1} onClick={this.previousPage}>Previous</button>
          <button className="pdfButtons" type="button" disabled={pageNumber >= numPages} onClick={this.nextPage}>Next</button>
        </div>
        <Document
          file={this.state.pdf}
          onLoadSuccess={this.onDocumentLoadSuccess}  >
          <Outline onItemClick={this.onItemClick} />
          <Page
            onLoadSuccess={removeTextLayerOffset}
            pageNumber={pageNumber}
            customTextRenderer={this.makeTextRenderer(searchText)}
          />
        </Document>
      </div>
    );
  }
}

export default PdfComponent;
