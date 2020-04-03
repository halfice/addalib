import * as React from 'react';
import styles from './Addalibrarcywebpart.module.scss';
import { IAddalibrarcywebpartProps } from './IAddalibrarcywebpartProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { SPHttpClient } from '@microsoft/sp-http';
import { default as pnp, ItemAddResult, Web, ReorderingRuleMatchType, RoleDefinitionBindings } from "sp-pnp-js";
import { Breadcrumb, IBreadcrumbItem } from 'office-ui-fabric-react/lib/Breadcrumb';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { DetailsList, DetailsListLayoutMode, Selection, SelectionMode, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
var Symbol = require('es6-symbol/polyfill');
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react';
import { saveAs } from 'file-saver';
//var FileSaver = require('file-saver');
import "video-react/dist/video-react.css"; // import css
import { Player } from 'video-react';
import * as FileSaver from 'file-saver'

export default class Addalibrarcywebpart extends React.Component<IAddalibrarcywebpartProps, {}> {
  public state: IAddalibrarcywebpartProps;
  constructor(props, context) {
    super(props);
    this.state = {
      spHttpClient: this.props.spHttpClient,
      description: "",
      SiteUrl: this.props.SiteUrl,
      FolderList: [],
      LibraryName: this.props.LibraryName,
      BreaCrumArray: [],
      FolderColumns: [],
      _items: [],
      FlagStageForBreadCrum: 0,
      ParentLibraryUrl: this.props.LibraryName,
      showPanel: false,
      CurrentVideoUrl: "",
      VideoHeading: "",
      currentsiteurl: this.props.currentsiteurl,
    }
    this.gettheFolders = this.gettheFolders.bind(this);
    this._onItemInvoked = this._onItemInvoked.bind(this);

  };




  public getfoldericonurl() {
    return "https://spoprod-a.akamaihd.net/files/odsp-next-prod_2019-04-12-sts_20190412.001/odsp-media/images/itemtypes/20/folder.svg";

  }
  public getfoldericonurlDoc() {
    return "https://cdn1.iconfinder.com/data/icons/color-bold-style/21/39-512.png";

  }
  public gettheFolders(folderurl) {
    var NewISiteUrl = this.props.SiteUrl;
    var NewSiteUrl = NewISiteUrl.replace("/SitePages", "");
    let webx = new Web(NewSiteUrl);
    var CheckCurrentNumberNavigation = this.state.FlagStageForBreadCrum;
    var Arraysx = [];
    var Arraysx1 = [];
    var counterlist = 1;
    webx.getFolderByServerRelativeUrl(folderurl)
      .expand("Folders, Files").get().then(r => {
        r.Folders.forEach(item => {
          var FinalName = "234" + counterlist;
          var NewData = {
            key: counterlist,
            name: FinalName,
            "Name": item.Name,
            index: 1,
            id: counterlist,
            iconName: this.getfoldericonurl(),
            serverurls: item.ServerRelativeUrl,
          }
          if (item.Name != "Forms") {
            Arraysx1.push(NewData);
            counterlist++;
          }
        });//get folders only
        var NewData1 = {
          text: this.props.LibraryName,
          key: this.state.ParentLibraryUrl,
          onClick: this._onBreadcrumbItemClicked
        }
        Arraysx.push(NewData1);
        //now getting files
        var FinalName1 = "234item";// + counterlist;
        r.Files.forEach(item => {
          var NewData = {
            key: counterlist,
            name: FinalName1,
            "Name": item.Name,
            index: 1,
            id: counterlist,
            iconName: this.getfoldericonurlDoc(),
            serverurls: item.ServerRelativeUrl,
          }
          Arraysx1.push(NewData);
          counterlist++;

        });



        const newItems = this._copyAndSort(Arraysx1, "Name", false);
        this.setState({
          _items: newItems
        });

        this.setState({
          FolderList: Arraysx,
          _items: newItems,

        });


      });


  }
  public gettheFoldersWithFiles(folderurl) {
    var NewISiteUrl = this.props.SiteUrl;
    var NewSiteUrl = NewISiteUrl.replace("/SitePages", "");
    let webx = new Web(NewSiteUrl);
    var CheckCurrentNumberNavigation = this.state.FlagStageForBreadCrum;
    var Arraysx = [];
    var Arraysx1 = [];
    var counterlist = 1;
    webx.getFolderByServerRelativeUrl(folderurl)
      .expand("Folders, Files").get().then(r => {
        r.Folders.forEach(item => {
          var FinalName = "234" + counterlist;

          var NewData = {
            key: counterlist,
            name: FinalName,
            "Name": item.Name,
            index: 1,
            id: counterlist,
            iconName: this.getfoldericonurl(),
            serverurls: item.ServerRelativeUrl,
          }
          if (item.Name != "Forms") {
            Arraysx1.push(NewData);

            counterlist++;
          }
        });//get folders only     


        //now getting files
        var FinalName1 = "234item";// + counterlist;
        r.Files.forEach(item => {
          var NewData = {
            key: counterlist,
            name: FinalName1,
            "Name": item.Name,
            index: 1,
            id: counterlist,
            iconName: this.getfoldericonurlDoc(),
            serverurls: item.ServerRelativeUrl,
          }
          Arraysx1.push(NewData);
          counterlist++;

        });

        const newItems = this._copyAndSort(Arraysx1, "Name", false);
        this.setState({
          _items: newItems
        });

        this.setState({
          _items: newItems,

        });


      });


  }
  public gettheFoldersInner(event: any): void {
    var NewISiteUrl = this.props.SiteUrl;//"https://mysite.sharepoint.com/sites/ATH";// this.props.SiteUrl;
    var NewSiteUrl = NewISiteUrl.replace("/SitePages", "");
    let webx = new Web(NewSiteUrl);
    var CheckCurrentNumberNavigation = this.state.FlagStageForBreadCrum;
    var Arraysx = [];
    var Arraysx1 = [];
    var counterlist = 1;
    var folderurl = event.target.id;
    webx.getFolderByServerRelativeUrl(folderurl)
      .expand("Folders, Files").get().then(r => {
        r.Files.forEach(item => {
          console.log(item.ServerRelativeUrl);
        })

      });



  }
  public componentDidMount() {
    if (this.props.SiteUrl != null && this.props.SiteUrl != undefined) {
      this.fillmonitorcolumns();
      this.gettheFolders(this.props.LibraryName)
    }
  }
  private _onBreadcrumbItemClicked = (ev: React.MouseEvent<HTMLElement>, item: IBreadcrumbItem): void => {
    ev.preventDefault();
    var BreadCrumsitems = [];
    BreadCrumsitems = this.state.FolderList;
    var CompleteItemArray = BreadCrumsitems;
    CompleteItemArray = CompleteItemArray.filter(function (CompleteItemArray) {
      return CompleteItemArray["key"] == item.key;
    });

    this.gettheFoldersWithFiles(CompleteItemArray[0]["key"]);
    var temBCarray = [];
    temBCarray = BreadCrumsitems;
    var finalBcarray = [];
    for (var x = 0; x < temBCarray.length; x++) {

      var NewData11 = {
        text: temBCarray[x]["text"],
        key: temBCarray[x]["key"],
        onClick: this._onBreadcrumbItemClicked
      }
      finalBcarray.push(NewData11);


      if (temBCarray[x].key == CompleteItemArray[0]["key"])
        break;

    }

    if (finalBcarray.length == 0) {
      var NewData1 = {
        text: this.props.LibraryName,
        key: this.state.ParentLibraryUrl,
        onClick: this._onBreadcrumbItemClicked

      }
      finalBcarray.push(NewData1);


    }


    this.setState({
      FolderList: finalBcarray,
    });

  };

  private downloadDocument(filenames, url) {

    var NewISiteUrl = this.props.SiteUrl;
    var NewSiteUrl = NewISiteUrl.replace("/SitePages", "");
    let webx = new Web(NewSiteUrl);
    var CheckCurrentNumberNavigation = this.state.FlagStageForBreadCrum;
    var Arraysx = [];
    var Arraysx1 = [];
    var counterlist = 1;
    webx.getFileByServerRelativeUrl(url).getBlob().then((blob: Blob) => {
      FileSaver.saveAs(blob, filenames);


    });



  }
  private _onColumnClick = (ev: React.MouseEvent<HTMLElement>, column: IColumn): void => {
    const { FolderColumns, _items } = this.state;
    const newColumns: IColumn[] = FolderColumns.slice();
    const currColumn: IColumn = newColumns.filter(currCol => column.key === currCol.key)[0];
    newColumns.forEach((newCol: IColumn) => {
      if (newCol === currColumn) {
        currColumn.isSortedDescending = !currColumn.isSortedDescending;
        currColumn.isSorted = true;
      } else {
        newCol.isSorted = false;
        newCol.isSortedDescending = true;
      }
    });
    const newItems = this._copyAndSort(_items, currColumn.fieldName!, currColumn.isSortedDescending);
    this.setState({
      FolderColumns: newColumns,
      _items: newItems
    });
  };

  private _copyAndSort<T>(items: T[], columnKey: string, isSortedDescending?: boolean): T[] {
    const key = columnKey as keyof T;
    return items.slice(0).sort((a: T, b: T) => ((isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1));
  }
  private _onItemInvoked(item: any): void {
    var BreadCrumsitems = []
    BreadCrumsitems = this.state.FolderList;
    var CompleteItemArray = this.state._items
    CompleteItemArray = CompleteItemArray.filter(function (CompleteItemArray) {
      return CompleteItemArray["Name"] == item.Name;
    });


    if (CompleteItemArray[0]["Name"].indexOf(".mp4") > -1) {
      this._showPanel(CompleteItemArray[0]["Name"], CompleteItemArray[0]["serverurls"]);
      return;
    }
    if (CompleteItemArray[0]["Name"].indexOf(".pptx") > -1 ||
      CompleteItemArray[0]["Name"].indexOf(".pdf") > -1 ||
      CompleteItemArray[0]["Name"].indexOf(".docx") > -1 ||
      CompleteItemArray[0]["Name"].indexOf(".psd") > -1 ||
      CompleteItemArray[0]["Name"].indexOf(".txt") > -1 ||
      CompleteItemArray[0]["Name"].indexOf(".ttf") > -1 ||
      CompleteItemArray[0]["Name"].indexOf(".ppt") > -1 ||
      CompleteItemArray[0]["Name"].indexOf(".jpg") > -1 ||
      CompleteItemArray[0]["Name"].indexOf(".otf") > -1 ||
      CompleteItemArray[0]["Name"].indexOf(".doc") > -1) {
      //this.downloadDocument(CompleteItemArray[0]["Name"], CompleteItemArray[0]["serverurls"]);
      window.open(this.state.currentsiteurl + "/" + CompleteItemArray[0]["serverurls"], "_blank");

    } else {
      this.gettheFoldersWithFiles(CompleteItemArray[0]["serverurls"]);
      //serverurls
      var NewData1 = {
        text: CompleteItemArray[0]["Name"],
        key: CompleteItemArray[0]["serverurls"],
        onClick: this._onBreadcrumbItemClicked
      }
      BreadCrumsitems.push(NewData1);
      this.setState({
        FolderList: BreadCrumsitems,
      });
    }
  }
  public fillmonitorcolumns() {
    var Tempcolumns = [];
    var counter = 1;
    var newData = {
      key: ".",
      name: ".",
      iconName: 'Page',
      isIconOnly: true,
      fieldName: "iconName",
      minWidth: 20,
      maxWidth: 60,
      isResizable: true,
      onColumnClick: this._onColumnClick,
    }
    Tempcolumns.push(newData);

    var newData2 = {
      key: "Name",
      name: "Name",
      fieldName: "Name",
      minWidth: 20,
      maxWidth: 300,
      isResizable: true,
      onColumnClick: this._onColumnClick,
    }
    Tempcolumns.push(newData2);
    counter++;

    this.setState({
      FolderColumns: Tempcolumns,
    });
  }
  private _showPanel = (name, url) => {
    this.setState({
      VideoHeading: name,
      CurrentVideoUrl: url,
      showPanel: true
    });
  };
  private _hidePanel = (): void => {
    this.setState({ showPanel: false });
  };




  public render(): React.ReactElement<IAddalibrarcywebpartProps> {


    return (
      <div className={styles.MyDvWholeClassName}>

        <div >
          <div>

            <Panel
              isOpen={this.state.showPanel}
              type={PanelType.smallFluid}
              onDismiss={this._hidePanel}
              headerText={this.state.VideoHeading}
            >
              <span>
                <div className={styles.foldersdivpadding}>
                  <PrimaryButton onClick={this._hidePanel.bind(this)}>Close</PrimaryButton>
                </div>

                <Player
                  playsInline
                  poster="/assets/poster.png"
                  src={this.state.CurrentVideoUrl}
                />


              </span>
            </Panel>
          </div>



        </div>

        <div className="panelclassoverrides">
          <Breadcrumb
            items={this.state.FolderList}
            ariaLabel={'Breadcrumb with no maxDisplayedItems'}
          />


          <DetailsList
            items={this.state._items}
            columns={this.state.FolderColumns}
            selectionMode={SelectionMode.single}
            setKey="set"
            layoutMode={DetailsListLayoutMode.fixedColumns}
            selectionPreservedOnEmptyClick={true}
            ariaLabelForSelectionColumn="Toggle selection"
            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
            onItemInvoked={this._onItemInvoked}
            onRenderItemColumn={_renderItemColumn}

          />

        </div>

      </div>
    );

    function _renderItemColumn(item: any, index: number, column: IColumn) {
      const fieldContent = item[column.fieldName || ''];
      var tempname = column.fieldName;

      var CheckIsIemorNot = "";
      var azizi="https://azizi021.sharepoint.com/sites/MyArabicSite/SiteAssets";
      var adda="https://abudhabidigital.sharepoint.com/sites/dev/SiteAssets";
      var final=adda;


      switch (column.key) {
        case '.':
          if (item.name.indexOf("item") > -1) {
            if (item.serverurls.indexOf(".pdf") > -1) {
              return (
                <img src="https://abudhabidigital.sharepoint.com/sites/dev/SiteAssets/pdf.png" width="30px" height="35px" />
              );
            }
            if (item.serverurls.indexOf(".doc") > -1 || item.serverurls.indexOf(".docx") > -1) {
              return (
                <img src="https://abudhabidigital.sharepoint.com/sites/dev/SiteAssets/dox.png" width="40px" height="40px" />
              );
            }

            if (item.serverurls.indexOf(".pptx") > -1) {
              return (
                <img src="https://abudhabidigital.sharepoint.com/sites/dev/SiteAssets/pptx.png" width="40px" height="40px" />
              );
            }
            if (item.serverurls.indexOf(".mp4") > -1) {
              return (
                <img src="https://abudhabidigital.sharepoint.com/sites/dev/SiteAssets/mp4.png" width="40px" height="40px" />
              );
            }

            if (item.serverurls.indexOf(".otf") > -1 || item.serverurls.indexOf(".ttf") > -1) {
              return (
                <img src="https://abudhabidigital.sharepoint.com/sites/dev/SiteAssets/fonts.png" width="40px" height="40px" />
              );
            }

            if (item.serverurls.indexOf(".xlsx") > -1 || item.serverurls.indexOf(".xls") > -1) {
              return (
                <img src="https://abudhabidigital.sharepoint.com/sites/dev/SiteAssets/excel.png" width="40px" height="40px" />
              );
            }

            return (
              <img src="https://abudhabidigital.sharepoint.com/sites/dev/SiteAssets/fonts.png" width="40px" height="40px" />
            );

          } else {
            return (
              <img src="https://abudhabidigital.sharepoint.com/sites/dev/SiteAssets/folder.png" />
            );
          }
        case 'Name':
          if (item.name.indexOf("234item") > -1) {
            return (
              <div className={styles.foldersdivpadding}> {item.Name}</div>
            );
          } else {

            return (
              <div className={styles.foldersdivpadding} > {item.Name}</div>
            );
          }


      }







    }
  }

}
