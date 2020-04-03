import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'AddalibrarcywebpartWebPartStrings';
import Addalibrarcywebpart from './components/Addalibrarcywebpart';
import { IAddalibrarcywebpartProps } from './components/IAddalibrarcywebpartProps';

export interface IAddalibrarcywebpartWebPartProps {
  description: string;
  ListNames: string;
  targetsite: string;
}

export default class AddalibrarcywebpartWebPart extends BaseClientSideWebPart <IAddalibrarcywebpartWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IAddalibrarcywebpartProps> = React.createElement(
      Addalibrarcywebpart,
      {
        description: this.properties.description,
        SiteUrl: this.properties.targetsite,
        spHttpClient: this.context.spHttpClient,
        LibraryName: this.properties.ListNames,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('Library Name', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            },
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('ListNames', {
                  label: "ListName"
                }

                ),
                
              ],
             
               
              
            },
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('targetsite', {
                  label: "targetsite"
                }

                ),
                
              ],
             
               
              
            },
          ]
        }
      ]
    };
  }
}
