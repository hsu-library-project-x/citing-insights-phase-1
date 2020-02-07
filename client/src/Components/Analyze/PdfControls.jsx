import React, { Component } from "react";
import {TextField, Button} from "@material-ui/core";
import { Document, Outline, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "./pdfComponent.css";

pdfjs.GlobalWorkerOptions.workerSrc =
    `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class PdfControls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numPages: null,
            pageNumber: null,
            searchText: '',
            scale: null,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.searchPdf = this.searchPdf.bind(this)
    }

    searchPdf(){
        //search through virtual text layers for a query

        //keep result of all pages

        // check if rendered
        return;
    }

    //call when input changes to update the state
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    componentWillReceiveProps(nextProps) {
        let bytes = new Uint8Array(nextProps.data);
        let blob = new Blob([bytes], { type: "application/pdf;base64" });
        this.setState({
            pdf: blob
        });
    }

    onChange = event => this.setState({ searchText: event.target.value });

    //Here is where we pass nack up to analyze, then pass down to PdfComponent
    onItemClick = ({ pageNumber }) => this.props.passPageInfo(pageNumber);

    onDocumentLoadSuccess = (document) => {
        const { numPages } = document;
        this.setState({
            numPages,
            pageNumber:1,
        });
    };

    changePage(offset) {
        let newNum = this.props.pageNumber === null ? 1 : this.props.pageNumber;
        newNum = newNum + offset;
        this.props.passPageInfo(newNum);
    };

    changeScale(offset) {
        let scale = this.props.scale === null ? 1.0 : this.props.scale;
        scale = scale + offset;
        this.props.passScaleInfo(scale);
    };

    previousPage = () => this.changePage(-1);

    nextPage = () => this.changePage(1);

    zoomIn = () => this.changeScale(0.25);

    zoomOut = () => this.changeScale(-0.25);


    render() {
        const { numPages,  /*searchText*/} = this.state;
        const { pageNumber, scale } = this.props;

        return (
            <div className="document-wrapper">
                <Document
                    file={this.state.pdf}
                    onLoadSuccess={this.onDocumentLoadSuccess}>
                    <div className="zoom-controls">
                        <button disabled={scale <= 0.1} onClick={this.zoomOut} type="button">
                            - </button>
                        Zoom
                        <button disabled={scale >= 6.0} onClick={this.zoomIn} type="button" >
                            + </button>
                    </div>
                    <div className="page-controls">
                        <button disabled={pageNumber <= 1} onClick={this.previousPage} type="button">
                            Previous </button>
                        {` Page ${pageNumber || (numPages ? 1 : '--')} of ${numPages || '--'} `}
                        <button disabled={pageNumber >= numPages} onClick={this.nextPage} type="button" >
                            Next </button>
                    </div>
                    <Outline className="outline-list" onItemClick={this.onItemClick} />
                </Document>
                <TextField
                    variant={'outlined'}
                    label={'Search'}
                    onChange={this.handleInputChange}
                    name="searchText"
                    style={{marginBottom: "1em"}} />
                <Button variant={'contained'} color={'secondary'} onClick={this.searchPdf}> Find </Button>
            </div>
        );
    }
}

export default PdfControls;