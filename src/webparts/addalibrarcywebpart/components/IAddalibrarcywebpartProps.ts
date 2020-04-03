import { SPHttpClient } from '@microsoft/sp-http';
import { Breadcrumb, IBreadcrumbItem } from 'office-ui-fabric-react/lib/Breadcrumb';
import { DetailsList, DetailsListLayoutMode, Selection, SelectionMode, IColumn } from 'office-ui-fabric-react/lib/DetailsList';



export interface IAddalibrarcywebpartProps {
  description: string;
  LibraryName:string;
  SiteUrl:string;
  spHttpClient: SPHttpClient;
  FolderList: IBreadcrumbItem[];
  BreaCrumArray:IBreadcrumbItem[];
  FolderColumns: IColumn[];
  _items: Array<object>;
  FlagStageForBreadCrum:Number;
  ParentLibraryUrl:string;
  showPanel: boolean;
  CurrentVideoUrl:string;
  VideoHeading:string;
  currentsiteurl:string;
  
}
