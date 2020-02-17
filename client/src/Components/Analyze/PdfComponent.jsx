import React, { forwardRef,Component } from "react";
import {Document, Page, pdfjs} from "react-pdf";
import { FixedSizeGrid   } from "react-window";
import {TextField, Toolbar,InputAdornment,IconButton, Tooltip  } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search'
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import "react-pdf/dist/Page/AnnotationLayer.css";
import "./pdfComponent.css";
import PdfControls from "./PdfControls.jsx";

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
      rowHeight:  1.5* window.innerHeight,
      rawText:[{}],
       matches:[],
    };

    this.ZoomIn = this.ZoomIn.bind(this);
    this.ZoomOut = this.ZoomOut.bind(this);
    this.ScrollTo = this.ScrollTo.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.Search = this.Search.bind(this);
    this.PassUpText = this.PassUpText.bind(this);

    this.GUTTER_SIZE = 5;
    this.gridRef = React.createRef();

  }


    PassUpText(rawText) {
        this.setState( ({
            rawText: rawText,
        }));
    };


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

     highlightPattern = (text, pattern) => {
         let regexp = new RegExp(pattern,'gi');
        const splitText = text.split(regexp);

        if (splitText.length <= 1) {
            return text;
        }

        const matches = text.match(regexp);

        return splitText.reduce((arr, element, index) => (matches[index] ? [
            ...arr,
            element,
            <mark>
                {matches[index]}
            </mark>,
        ] : [...arr, element]), []);
    };

  Search(subject, objects){
      let matches =[];

      if(subject !== ""){
          let regexp = new RegExp(subject,'gi');
          for (let k=1; k<Object.keys(objects).length;k++){
              for (let i=0; i<objects[k].length; i++){
                  // console.log(objects[k][i]);
                  if (objects[k][i]['str'].match(regexp)) {
                      //string, page, line
                      matches.push([objects[k][i]['str'],k,i]);
                  }
              }
          }
      }

      this.setState({
          matches: matches
      });
      return matches;
  };

    // call when input changes to update the state
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name=target.name;
        this.setState({[name]:value});
        this.Search(value, this.state.rawText);
    }

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
    makeTextRenderer = searchText => textItem => this.highlightPattern(textItem.str, searchText);

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
              // onGetTextSuccess={(items) => this.getLayers(items,rowIndex+1)}
              customTextRenderer={this.makeTextRenderer(this.state.searchText)}
              // onLoadSuccess={()=>console.log(rowIndex+1)}
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
                name={'searchText'}
                onChange={this.handleInputChange}
                placeholder={"search"}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
              />
              <p> {this.state.matches.length} matches</p>
              <Tooltip title="Previous">
                  <IconButton aria-label="previous-search-result" color="primary" onClick={this.ZoomIn}>
                      <NavigateBeforeIcon />
                  </IconButton>
              </Tooltip>
              <Tooltip title="Next">
                  <IconButton aria-label="next-search-result" color="primary" onClick={this.ZoomIn}>
                      <NavigateNextIcon />
                  </IconButton>
              </Tooltip>

              <p> Go to Page </p>
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
              <p> of {this.state.numPages} </p>
              <Tooltip title="Zoom Out">
                  <IconButton aria-label="zoom-out" color="primary"  onClick={this.ZoomOut}>
                      <ZoomOutIcon />
                  </IconButton>
              </Tooltip>
              <Tooltip title="Zoom In">
                  <IconButton aria-label="zoom-in" color="primary" onClick={this.ZoomIn}>
                      <ZoomInIcon />
                  </IconButton>
              </Tooltip>

          </Toolbar>

        <Document
          file={this.state.pdf}
          onLoadSuccess={this.onDocumentLoadSuccess}
          className="pdf-container"

        >
          {this.GenerateGrid()}
        </Document>
          <PdfControls
              PassUpText={this.PassUpText}
              pageNum={this.state.pageNumber}
              pdf={this.state.pdf}
          />
      </div>
    );
  }
}

export default PdfComponent;
