import React, { forwardRef,Component,createContext } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { FixedSizeGrid   } from "react-window";
import {TextField, Toolbar,InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search'
import "react-pdf/dist/Page/AnnotationLayer.css";
import "./pdfComponent.css";

pdfjs.GlobalWorkerOptions.workerSrc =
  `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


class PdfComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numPages: null,
      pageNumber: this.props.pageNumber,
      searchText: '',
      pdf: new Blob([this.props.data], { type: "application/pdf;base64" }),
      scale: 1.0
    };

    this.GUTTER_SIZE = 5;
    this.COLUMN_WIDTH = window.innerWidth/2;
    this.ROW_HEIGHT =  1.5* window.innerHeight ;
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



  GenerateGrid = () => {
    //Sticky stuff
    const StickyListContext = createContext();
    StickyListContext.displayName = "StickyListContext";

    const StickyRow = ({ index, style }) => (
        <div className="sticky" style={style}>
          Stick {index}
        </div>
    );

    const innerElementType = forwardRef(({ style, ...rest }, ref) => (
        <div
            ref={ref}
            style={{
              ...style,
              paddingLeft: this.GUTTER_SIZE,
              paddingTop: this.GUTTER_SIZE,
              marginBottom:this.GUTTER_SIZE,
            }}
            {...rest}
        />
    ));

    const Cell = ({columnIndex, rowIndex, style}) => (
        <div
            className={"GridItem"}
            style={{
              ...style,
              left: style.left + this.GUTTER_SIZE,
              top: style.top + this.GUTTER_SIZE,
              width: style.width - this.GUTTER_SIZE,
              height: style.height - this.GUTTER_SIZE
            }}
        >
          <Page
              height={this.ROW_HEIGHT}
              // width={this.COLUMN_WIDTH}
              key={`page_${rowIndex + 1}`}
              pageNumber={rowIndex + 1}
              className="pdf-viewer"
              scale={1.0}
          />
        </div>
    );

    return (
        <FixedSizeGrid
        className="Grid"
        columnCount={1}
        columnWidth={this.COLUMN_WIDTH + this.GUTTER_SIZE}
        height={this.ROW_HEIGHT}
        innerElementType={innerElementType}
        rowCount={this.state.numPages}
        rowHeight={this.ROW_HEIGHT+ this.GUTTER_SIZE }
        width={this.COLUMN_WIDTH}
      >
        {Cell}
      </FixedSizeGrid>
    );
  };


  render() {
    return (
      <div className="document-wrapper">
          <Toolbar>
              <TextField
                placeholder={"search"}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
              />

          </Toolbar>

        <Document
          file={this.state.pdf}
          onLoadSuccess={this.onDocumentLoadSuccess}
          className="pdf-container"

        >
          {this.GenerateGrid()}
        </Document>
      </div>
    );
  }
}

export default PdfComponent;
