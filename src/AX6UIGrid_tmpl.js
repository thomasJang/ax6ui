import jQuery from "jqmin";
import U from "./AX6Util";


const main = function () {
    return `<div data-ax6grid-container="root" data-ax6grid-instance="{{instanceId}}">
            <div data-ax6grid-container="hidden">
                <textarea data-ax6grid-form="clipboard"></textarea>
            </div>
            <div data-ax6grid-container="header">
                <div data-ax6grid-panel="aside-header"></div>
                <div data-ax6grid-panel="left-header"></div>
                <div data-ax6grid-panel="header">
                    <div data-ax6grid-panel-scroll="header"></div>
                </div>
                <div data-ax6grid-panel="right-header"></div>
            </div>
            <div data-ax6grid-container="body">
                <div data-ax6grid-panel="top-aside-body"></div>
                <div data-ax6grid-panel="top-left-body"></div>
                <div data-ax6grid-panel="top-body">
                    <div data-ax6grid-panel-scroll="top-body"></div>
                </div>
                <div data-ax6grid-panel="top-right-body"></div>
                <div data-ax6grid-panel="aside-body">
                    <div data-ax6grid-panel-scroll="aside-body"></div>
                </div>
                <div data-ax6grid-panel="left-body">
                    <div data-ax6grid-panel-scroll="left-body"></div>
                </div>
                <div data-ax6grid-panel="body">
                    <div data-ax6grid-panel-scroll="body"></div>
                </div>
                <div data-ax6grid-panel="right-body">
                  <div data-ax6grid-panel-scroll="right-body"></div>
                </div>
                <div data-ax6grid-panel="bottom-aside-body"></div>
                <div data-ax6grid-panel="bottom-left-body"></div>
                <div data-ax6grid-panel="bottom-body">
                    <div data-ax6grid-panel-scroll="bottom-body"></div>
                </div>
                <div data-ax6grid-panel="bottom-right-body"></div>
            </div>
            <div data-ax6grid-container="page">
                <div data-ax6grid-page="holder">
                    <div data-ax6grid-page="navigation"></div>
                    <div data-ax6grid-page="status"></div>
                </div>
            </div>
            <div data-ax6grid-container="scroller">
                <div data-ax6grid-scroller="vertical">
                    <div data-ax6grid-scroller="vertical-bar"></div>    
                </div>
                <div data-ax6grid-scroller="horizontal">
                    <div data-ax6grid-scroller="horizontal-bar"></div>
                </div>
                <div data-ax6grid-scroller="corner"></div>
            </div>
            <div data-ax6grid-resizer="vertical"></div>
            <div data-ax6grid-resizer="horizontal"></div>
        </div>`;
};

const page_navigation = function(){
    return `<div data-ax6grid-page-navigation="holder">
            {{#hasPage}}
            <div data-ax6grid-page-navigation="cell">    
                {{#firstIcon}}<button type="button" data-ax6grid-page-move="first">{{{firstIcon}}}</button>{{/firstIcon}}
                <button type="button" data-ax6grid-page-move="prev">{{{prevIcon}}}</button>
            </div>
            <div data-ax6grid-page-navigation="cell-paging">
                {{#@paging}}
                <button type="button" data-ax6grid-page-move="{{pageNo}}" data-ax6grid-page-selected="{{selected}}">{{pageNo}}</button>
                {{/@paging}}
            </div>
            <div data-ax6grid-page-navigation="cell">
                <button type="button" data-ax6grid-page-move="next">{{{nextIcon}}}</button>
                {{#lastIcon}}<button type="button" data-ax6grid-page-move="last">{{{lastIcon}}}</button>{{/lastIcon}}
            </div>
            {{/hasPage}}
        </div>`;
};

const page_status = function(){
    return `<span>{{{progress}}} {{fromRowIndex}} - {{toRowIndex}} of {{totalElements}}{{#dataRowCount}} ({{dataRowCount}}){{/dataRowCount}}</span>`;
};


export default {
    "main": main,
    "page_navigation": page_navigation,
    "page_status": page_status
};