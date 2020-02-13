import React, { forwardRef,Component,createContext } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { FixedSizeGrid   } from "react-window";
import {TextField, Toolbar,InputAdornment,IconButton, Tooltip  } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search'
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
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
      scale: 1.0,
      columnWidth:  window.innerWidth/2,
      rowHeight:  window.innerHeight,
    };

    this.ZoomIn = this.ZoomIn.bind(this);
    this.ZoomOut = this.ZoomOut.bind(this);
    this.ScrollTo = this.ScrollTo.bind(this);

      this.GUTTER_SIZE = 5;
      this.gridRef = React.createRef();
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

  ZoomIn(){
      let offset=0.25 ;

      this.setState( {
          columnWidth:this.state.columnWidth + (this.state.columnWidth * offset),
           rowHeight: this.state.rowHeight + (this.state.rowHeight * offset),
      });
  }

    ZoomOut(){
        let offset=-0.25 ;

        this.setState( {
            columnWidth:this.state.columnWidth + (this.state.columnWidth * offset),
            rowHeight: this.state.rowHeight + (this.state.rowHeight * offset),
        });
    }

    ScrollTo(event){
      event.preventDefault();
      let that = this;
      let page= event.target.value;

    that.gridRef.current.scrollToItem({
        columnIndex: 1,
        rowIndex: page-1,
    });
    }

  GenerateGrid = () => {


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
              height={this.state.rowHeight}
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
        columnWidth={this.state.columnWidth + this.GUTTER_SIZE}
        height={this.state.rowHeight}
        innerElementType={innerElementType}
        rowCount={this.state.numPages}
        rowHeight={this.state.rowHeight+ this.GUTTER_SIZE }
        width={this.state.columnWidth}
        ref={this.gridRef}
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
              <Tooltip title="Zoom In">
                  <IconButton aria-label="zoom-in" color="primary" onClick={this.ZoomIn}>
                      <ZoomInIcon />
                  </IconButton>
              </Tooltip>
              <Tooltip title="Zoom Out">
                  <IconButton aria-label="zoom-out" color="primary"  onClick={this.ZoomOut}>
                      <ZoomOutIcon />
                  </IconButton>
              </Tooltip>
              <p> Go to Page
              <TextField
                  onChange={this.ScrollTo}
                  aria-label="Page Number"
                  type="number"
                  size={'small'}
                  InputLabelProps={{
                  shrink: true,}}
                  InputProps={{
                      inputProps: {
                          max: this.state.numPages,
                          min: 1
                      }
                     }}

                  />
              of {this.state.numPages}
              </p>

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
