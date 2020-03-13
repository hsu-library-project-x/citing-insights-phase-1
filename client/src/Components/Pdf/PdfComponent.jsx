import React, { forwardRef, PureComponent } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { FixedSizeGrid } from "react-window";
import { TextField, Toolbar, InputAdornment, IconButton, Tooltip, AppBar } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search'
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import PdfControls from "./PdfControls";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "./pdfComponent.css";

pdfjs.GlobalWorkerOptions.workerSrc =
    `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


class PdfComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            numPages: null,
            pageNumber: this.props.pageNumber,
            searchText: '',
            pdf: new Blob([this.props.data], { type: "application/pdf;base64" }),
            scale: 1.0,
            columnWidth: window.innerWidth / 2,
            rowHeight: 1.5 * window.innerHeight,
            rawText: [{}],
            matches: [],
            loadedPage: 1,
            currentMatch: null,
        };

        this.ZoomIn = this.ZoomIn.bind(this);
        this.ZoomOut = this.ZoomOut.bind(this);
        this.ScrollTo = this.ScrollTo.bind(this);
        this.SearchScroll = this.SearchScroll.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.Search = this.Search.bind(this);
        this.PassUpText = this.PassUpText.bind(this);

        this.windowHeight = window.innerHeight;
        this.windowWidth = window.innerWidth / 1.5;

        this.GUTTER_SIZE = 5;
        this.gridRef = React.createRef();

        const innerElementType = forwardRef(({ style, ...rest }, ref) => (
            <div
                ref={ref}
                style={{
                    ...style,
                    paddingLeft: this.GUTTER_SIZE,
                    paddingTop: this.GUTTER_SIZE,
                    marginBottom: this.GUTTER_SIZE,
                }}
                {...rest}
            />
        ));
    }

    removeTextLayerOffset() {
        const textLayers = document.querySelectorAll(".react-pdf__Page__textContent");
        textLayers.forEach(layer => {
            const { style } = layer;
            style.top = "0";
            style.left = "0";
            style.transform = "";
            style.margin = "auto";
        });
    }

    PassUpText(rawText) {
        let that = this;
        that.setState( ({
            rawText: rawText,
        }));
    };

    componentDidMount() {
    }


    componentWillReceiveProps(nextProps) {

        let bytes = new Uint8Array(nextProps.data);
        let blob = new Blob([bytes], { type: "application/pdf;base64" });
        this.setState({
            pdf: blob
        });

    }

    componentWillUnmount() {
        console.log('unmounting pdf');
    }

    onDocumentLoadSuccess = (document) => {
        const { numPages } = document;
        this.setState({
            numPages,
            pageNumber: 1,
        });
    };

    highlightPattern = (text, pattern) => {
        let newPattern = pattern.replace(/[^\w\s]/, "");
        newPattern = newPattern.replace(/\\/g, '');

        let regexp = new RegExp(newPattern, 'gi');

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

    SearchScroll() {
        let that = this;
        let match = this.state.matches[this.state.currentMatch];

        if (match !== undefined) {
            if (match[1] === this.state.loadedPage) {
                return;
            }
            else {
                that.gridRef.current.scrollToItem({
                    columnIndex: 1,
                    rowIndex: match[1] - 1,
                });
            }
        }

    }


    Search(subject, objects) {
        let matches = [];
        let current = null;

        let newString = subject.replace(/[^\w\s]/, "");
        newString = newString.replace(/\\/g, '');
        let regexp = new RegExp(newString, 'gi');
        const splitText = newString.split(regexp);

        if (newString !== "") {

            for (let k = 1; k < Object.keys(objects).length; k++) {
                for (let i = 0; i < objects[k].length; i++) {
                    if (objects[k][i]['str'].match(regexp)) {
                        //string, page, line
                        matches.push([objects[k][i]['str'], k, i]);
                    }
                }
            }
            if (matches.length >= 1) {
                current = 1;
            }

        }

        this.setState({
            matches: matches,
            currentMatch: current,
        }, () => this.SearchScroll());

        return matches;
    };

    // call when input changes to update the state
    handleInputChange(event) {
        const target = event.target;
        const value = target.value.replace(/[^\w\s]/, "");
        const name = target.name;
        this.setState({ [name]: value });
        this.Search(value, this.state.rawText);
    }

    PreviousResult() {
        this.setState((prevState) => ({
            currentMatch: prevState.currentMatch - 1
        }), this.SearchScroll());
    }

    NextResult() {
        this.setState((prevState) => ({
            currentMatch: prevState.currentMatch + 1
        }), this.SearchScroll());
    }

    ZoomIn() {
        let offset = 0.25;

        this.setState((prevState) => ({
            columnWidth: prevState.columnWidth + (prevState.columnWidth * offset),
            rowHeight: prevState.rowHeight + (prevState.rowHeight * offset),
        }));
    }

    ZoomOut() {
        let offset = -0.25;

        this.setState((prevState) => ({
            columnWidth: prevState.columnWidth + (prevState.columnWidth * offset),
            rowHeight: prevState.rowHeight + (prevState.rowHeight * offset),
        }));
    }

    ScrollTo(event) {
        event.preventDefault();
        let that = this;
        let page = event.target.value;

        that.gridRef.current.scrollToItem({
            align: "start",
            columnIndex: 1,
            rowIndex: page - 1,
        });
    }
    makeTextRenderer = searchText => textItem => this.highlightPattern((textItem.str).replace(/[^\w\s]/, ""), searchText);

    GenerateGrid = () => {

        const Cell = ({ columnIndex, rowIndex, style }) => (
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
                    customTextRenderer={this.makeTextRenderer(this.state.searchText)}
                    onLoadSuccess={() => this.removeTextLayerOffset()}
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
                height={this.windowHeight}
                innerElementType={this.innerElementType}
                rowCount={this.state.numPages}
                rowHeight={this.state.rowHeight + this.GUTTER_SIZE}
                width={this.windowWidth}
                ref={this.gridRef}
            >
                {Cell}
            </FixedSizeGrid>
        );
    };


  render() {
    return (
      <div className="document-wrapper">
          {/*<Container maxWidth="md">*/}
          <AppBar color={'transparent'} position="sticky" className={'pdf-ToolBar'}>
              <Toolbar className={'pdf-ToolBar'} disableGutters={true}>
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
                  <p> {this.state.currentMatch ? this.state.currentMatch + " of ": null} {this.state.matches.length} matches</p>
                  <Tooltip title="Previous">
                      <IconButton
                          aria-label="previous-search-result"
                          color="primary"
                          disabled={this.state.currentMatch <= 1}
                          onClick={() =>this.PreviousResult()}>
                          <NavigateBeforeIcon />
                      </IconButton>
                  </Tooltip>
                  <Tooltip title="Next">
                      <IconButton
                          aria-label="next-search-result"
                          color="primary"
                          disabled={this.state.currentMatch >= this.state.matches.length}
                          onClick={() => this.NextResult()}>
                          <NavigateNextIcon />
                      </IconButton>
                  </Tooltip>

                        <p> Go to Page </p>
                        <TextField
                            onChange={this.ScrollTo}
                            aria-label="Page Number"
                            type="number"
                            defaultValue={1}
                            size={'small'}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                inputProps: {
                                    max: this.state.numPages,
                                    min: 1
                                }
                            }}

                        />
                        <p> of {this.state.numPages} </p>
                        <Tooltip title="Zoom Out">
                            <IconButton aria-label="zoom-out" color="primary" onClick={this.ZoomOut}>
                                <ZoomOutIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Zoom In">
                            <IconButton aria-label="zoom-in" color="primary" onClick={this.ZoomIn}>
                                <ZoomInIcon />
                            </IconButton>
                        </Tooltip>
                    </Toolbar>
                </AppBar>
                {/*</Container>*/}
                <Document
                    file={this.state.pdf}
                    onLoadSuccess={this.onDocumentLoadSuccess}
                    className="pdf-container"
                    error={"Loading may take a few seconds...."}
                >
                    {this.GenerateGrid()}
                </Document>
                {/*pdf controls is not shown with a css display:hidden eventually I need to make mode efficiant*/}
                    <PdfControls
                        PassUpText={this.PassUpText}
                        pageNum={this.state.pageNumber}
                        pdf={this.state.pdf}
                    />
            </div>
        );
    }
}

function PdfPropsAreEqual(prevProps, nextProps) {
    return prevProps.data === nextProps.data
        && prevProps.pageNumber === nextProps.pageNumber;
}

//Wrapping the component in a memo lets us check against a memoized version -- eliminating unneccessary rerenders
export default React.memo(PdfComponent, PdfPropsAreEqual);
