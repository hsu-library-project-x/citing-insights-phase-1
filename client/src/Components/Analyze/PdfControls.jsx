import React, { Component } from "react";
import { Document, Page, Outline, pdfjs } from "react-pdf";
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
            scale: null
        }
    }


    componentWillReceiveProps(nextProps) {

        let bytes = new Uint8Array(nextProps.data);
        let blob = new Blob([bytes], { type: "application/pdf;base64" });

        this.setState({
            pdf: blob
        })
    }

    onChange = event => this.setState({ searchText: event.target.value });

    //Here is where we pass nack up to analyze, then pass down to PdfComponent
    onItemClick = ({ pageNumber }) => this.props.passPageInfo(pageNumber);

    onDocumentLoadSuccess = (document) => {
        const { numPages } = document;
        this.setState({
            numPages,
            pageNumber: 1,
        });
    };

    changePage(offset) {
        let newNum = this.props.pageNumber === null ? 1 : this.props.pageNumber;
        newNum = newNum + offset
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
        const { numPages, searchText } = this.state;
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
            </div>
        );
    }
}


export default PdfControls;