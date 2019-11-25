import React, {Component} from "react";
import {Document, Page, pdfjs} from "react-pdf";
import './PdfComponent.css';

pdfjs.GlobalWorkerOptions.workerSrc = 
 `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`


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
  constructor(props){
    super(props);
    this.state = {
      numPages: null,
      pageNumber: 1,
      searchText: '',
      pdf: new Blob([this.props.data], {type: "application/pdf;base64"})
      //will put paper here, passed in as prop
      //paper: this.props.paper (or something)
    }
    
  }

  componentWillReceiveProps(nextProps) {
    
    var bytes = new Uint8Array(nextProps.data);
    var blob=new Blob([bytes], {type: "application/pdf;base64"});

    this.setState({pdf: blob})
}

  componentWillMount() {  

    
    
    var bytes = new Uint8Array(this.props.data);
    var blob=new Blob([bytes], {type: "application/pdf;base64"});

    this.setState({pdf: blob})
  }

  makeTextRenderer = searchText => textItem => highlightPattern(textItem.str, searchText);

  onChange = event => this.setState({ searchText: event.target.value });

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
    //var pdfAsArray = convertDataURIToBinary(fileURL);


    //var bytes = new Uint8Array(this.props.data);
    //var blob=new Blob([bytes], {type: "application/pdf;base64"});
    //var link=document.createElement('a');
    //link.href=window.URL.createObjectURL(blob);
    //link.download="myFileName.pdf";
    //link.click();


    return (
      <div>
        <React.Fragment>
          <Document file={this.state.pdf} onLoadSuccess={this.onDocumentLoadSuccess}  >
            <Page onLoadSuccess={() => removeTextLayerOffset()} pageNumber={pageNumber} customTextRenderer={this.makeTextRenderer(searchText)} />
          </Document>
          <div class="pdfInfo">
            <p className="pdfPage">
              Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
            </p>

            <form role="search">
               <label htmlFor="search">Search:</label>
               <input  placeholder="Begin typing..." class="pdfSearch" type="search" id="search" value={searchText} onChange={this.onChange} />
            </form>
            <button class="pdfButtons" type="button" disabled={pageNumber <= 1} onClick={this.previousPage}>Previous</button>
            <button class="pdfButtons" type="button" disabled={pageNumber >= numPages} onClick={this.nextPage}>Next</button>
          </div>
        </React.Fragment>
      </div>
    );
  }
}

export default PdfComponent;
