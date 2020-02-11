import React, { forwardRef,Component,createContext } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { VariableSizeList   } from "react-window";
import {AppBar, Toolbar} from '@material-ui/core';
import "react-pdf/dist/Page/AnnotationLayer.css";
import "./pdfComponent.css";
import App from "../../App";

pdfjs.GlobalWorkerOptions.workerSrc =
  `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// function getPages(numPages, scale){
//   console.log("HIIIII");
//   const height = window.innerHeight/2;
//   console.log(height);
//   const rowHeights = new Array(numPages)
//       .fill(true)
//       .map(()=> height);
//
//   const getItemSize = index => rowHeights[index];
//
//   const Row =({index, style}) =>(
//       <Page
//           onLoadSuccess={removeTextLayerOffset}
//           key={`page_${index + 1}`}
//           pageNumber={index + 1}
//           scale={scale}
//           className="pdf-viewer"
//       />
//   );
//
//   const Pages = () => (
//       <VariableSizeList
//         height={height}
//         itemCount={numPages}
//         itemSize={getItemSize}
//         width={600}
//       >
//         {Row}
//       </VariableSizeList>
//   );
//
//   return Pages;
// }

//Fixes the offset for text highlighting
// function removeTextLayerOffset() {
//   const textLayers = document.querySelectorAll(".react-pdf__Page__textContent");
//   textLayers.forEach(layer => {
//     const { style } = layer;
//     style.top = "0";
//     style.left = "0";
//     style.transform = "";
//     style.margin = "auto";
//   });
// }

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
    // const { numPages } = this.state;
    const { pageNumber, /*searchText,*/ scale } = this.props;
    // const GUTTER_SIZE = 5;
    const StickyListContext = createContext();
    StickyListContext.displayName = "StickyListContext";
    const WIDTH = window.innerWidth;
    const ROW_HEIGHT =  window.innerHeight + window.innerHeight/2.5;
    const StickyRow = ({ index, style }) => (
        <div className="sticky" style={style}>
            Stick {index}
        </div>
    );
    const rowHeights = new Array(this.state.numPages)
        .fill(true)
        .map(()=> ROW_HEIGHT);
    const getItemSize = index => rowHeights[index];
    const Row =({index, style}) =>(
        <div
            style={style}
            // style={{
            //   ...style,
            //   left: style.left - GUTTER_SIZE,
            //   top: style.top + GUTTER_SIZE,
            //   bottom: style.bottom + GUTTER_SIZE,
            //   right: style.right - GUTTER_SIZE,
            //   width: style.width - GUTTER_SIZE,
            //   height: style.height - GUTTER_SIZE
            // }}
        >
        <Page
            // onLoadSuccess={removeTextLayerOffset}
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            // scale={1.0}
            className="pdf-viewer"
        />
    </div>
    );

    return (
      <div className="document-wrapper">

        <Document
          file={this.state.pdf}
          onLoadSuccess={this.onDocumentLoadSuccess}
          className="pdf-container"

        >
          <VariableSizeList
              height={ROW_HEIGHT}
              itemCount={this.state.numPages}
              itemSize={getItemSize}
              width={WIDTH}
          >
            {Row}
          </VariableSizeList >
        </Document>
      </div>
    );
  }
}

export default PdfComponent;
