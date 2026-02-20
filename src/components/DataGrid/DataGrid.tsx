import React, { useRef, useEffect, useState } from 'react';
import DevExtremeDataGrid, {
  Column,
  Paging,
  Pager,
  Export,
  Selection,
  Editing,
  HeaderFilter,
  FilterRow,
  Scrolling,
  Toolbar,
  Item,
  ColumnChooser,
  Summary,
  TotalItem,
  GroupItem,
  Grouping,
  GroupPanel,
  ColumnFixing,
  StateStoring
} from 'devextreme-react/data-grid';
import { Button } from 'devextreme-react/button';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
import './DataGrid.css';

export interface DataGridColumn {
  dataField?: string;
  caption?: string;
  width?: number | string;
  alignment?: 'left' | 'center' | 'right';
  visible?: boolean;
  allowEditing?: boolean;
  dataType?: 'string' | 'number' | 'date' | 'boolean' | 'object' | 'datetime';
  format?: string;
  cellRender?: (cellData: any) => React.ReactNode;
  calculateCellValue?: (rowData: any) => any;
  customizeText?: (cellInfo: any) => string;
  groupIndex?: number;
  columns?: DataGridColumn[]; // For nested headers
}

export interface SummaryItem {
  column: string;
  summaryType: 'sum' | 'avg' | 'count' | 'min' | 'max';
  displayFormat?: string;
  valueFormat?: string;
  alignByColumn?: boolean;
  showInGroupFooter?: boolean;
}

export interface ToolbarButton {
  text: string;
  icon?: string;
  onClick: () => void;
  type?: 'default' | 'success' | 'danger' | 'normal';
  disabled?: boolean;
  location?: 'before' | 'after';
}

export interface DataGridProps {
  /** Grid ID for identification */
  id: string;

  /** Data key field */
  keyExpr?: string;

  /** API URL for data fetching */
  url?: string;

  /** Static data source (alternative to URL) */
  dataSource?: any[];

  /** Column definitions */
  columns: DataGridColumn[];

  /** Query parameters for API calls */
  params?: Record<string, any>;

  /** Custom configuration to merge with defaults */
  customConfig?: Record<string, any>;

  /** Export file name */
  exportFileName?: string;

  /** Export button text */
  exportButtonText?: string;

  /** Column Chooser button text */
  columnChooserButtonText?: string;

  /** Save Layout button text */
  saveLayoutButtonText?: string;

  /** Enable/disable features */
  enableExport?: boolean;
  enableColumnChooser?: boolean;
  enableSaveLayout?: boolean;
  enableColumnReordering?: boolean;
  enablePaging?: boolean;
  enableSelection?: boolean;
  enableEditing?: boolean;

  /** Paging configuration */
  pageSize?: number;
  allowedPageSizes?: number[];

  /** Editing configuration */
  editingMode?: 'batch' | 'row' | 'cell' | 'form' | 'popup';
  allowUpdating?: boolean;
  allowAdding?: boolean;
  allowDeleting?: boolean;

  /** Selection configuration */
  selectionMode?: 'single' | 'multiple' | 'none';

  /** Scrolling configuration */
  scrollingMode?: 'standard' | 'virtual' | 'infinite';

  /** Summary configuration */
  enableSummary?: boolean;
  summaryItems?: SummaryItem[];
  groupSummaryItems?: SummaryItem[];

  /** Grouping configuration */
  enableGrouping?: boolean;
  enableGroupPanel?: boolean;
  autoExpandAll?: boolean;

  /** Filter configuration */
  enableFilterRow?: boolean;
  enableHeaderFilter?: boolean;

  /** Title configuration */
  title?: string;

  /** Toolbar custom buttons */
  toolbarButtons?: ToolbarButton[];

  /** Event handlers */
  onContentReady?: (e: any) => void;
  onRowClick?: (e: any) => void;
  onSelectionChanged?: (e: any) => void;
  onSaved?: (e: any) => void;

  /** Custom data loading function */
  onLoadData?: (params: Record<string, any>) => Promise<any>;
}

export const DataGrid: React.FC<DataGridProps> = ({
  id,
  keyExpr = 'id',
  url,
  dataSource: staticDataSource,
  columns,
  params = {},
  customConfig = {},
  exportFileName = 'export',
  exportButtonText = '엑셀 다운로드',
  columnChooserButtonText = '컬럼 선택',
  saveLayoutButtonText = '표 저장',
  enableExport = true,
  enableColumnChooser = true,
  enableSaveLayout = true,
  enableColumnReordering = true,
  enablePaging = true,
  enableSelection = false,
  enableEditing = false,
  pageSize = 10,
  allowedPageSizes = [10, 20, 50, 100],
  editingMode = 'batch',
  allowUpdating = false,
  allowAdding = false,
  allowDeleting = false,
  selectionMode = 'none',
  scrollingMode = 'standard',
  enableSummary = false,
  summaryItems = [],
  groupSummaryItems = [],
  enableGrouping = false,
  enableGroupPanel = false,
  autoExpandAll = false,
  enableFilterRow = false,
  enableHeaderFilter = false,
  title,
  toolbarButtons = [],
  onContentReady,
  onRowClick,
  onSelectionChanged,
  onSaved,
  onLoadData,
}) => {
  const gridRef = useRef<DevExtremeDataGrid>(null);
  const [dataSource, setDataSource] = useState<any>(null);

  useEffect(() => {
    // Use static data if provided
    if (staticDataSource) {
      setDataSource(staticDataSource);
      return;
    }

    // Create data source with API URL
    if (url || onLoadData) {
      const customStore = new CustomStore({
        key: keyExpr,
        load: async (loadOptions) => {
          try {
            const requestParams = {
              ...params,
              skip: loadOptions.skip || 0,
              take: loadOptions.take || pageSize,
              sort: loadOptions.sort,
              filter: loadOptions.filter,
            };

            let response;
            if (onLoadData) {
              response = await onLoadData(requestParams);
            } else if (url) {
              const queryString = new URLSearchParams(
                Object.entries(requestParams).reduce((acc, [key, value]) => {
                  acc[key] = String(value);
                  return acc;
                }, {} as Record<string, string>)
              ).toString();

              const fullUrl = `${url}?${queryString}`;
              const res = await fetch(fullUrl);
              response = await res.json();
            }

            return {
              data: response.data || response,
              totalCount: response.totalCount || response.total || (response.data?.length || response.length || 0),
            };
          } catch (error) {
            console.error('DataGrid load error:', error);
            return { data: [], totalCount: 0 };
          }
        },
      });

      setDataSource(new DataSource({ store: customStore }));
    }
  }, [url, staticDataSource, params, keyExpr, pageSize, onLoadData]);

  const handleContentReady = (e: any) => {
    if (onContentReady) {
      onContentReady(e);
    }
  };

  const handleExporting = (e: any) => {
    console.log('handleExporting called', e);
    try {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet('Sheet1');
      console.log('Workbook and worksheet created');

      exportDataGrid({
        component: e.component,
        worksheet: worksheet,
        autoFilterEnabled: true,
      }).then(() => {
        console.log('exportDataGrid completed');
        workbook.xlsx.writeBuffer().then((buffer) => {
          console.log('Buffer created, saving file...');
          saveAs(new Blob([buffer], { type: 'application/octet-stream' }), `${exportFileName}.xlsx`);
          console.log('File saved!');
        });
      }).catch((error) => {
        console.error('exportDataGrid error:', error);
      });
      e.cancel = true;
    } catch (error) {
      console.error('handleExporting error:', error);
    }
  };

  const toolbarItems = [];

  // Add custom buttons first
  toolbarButtons.forEach((btn) => {
    toolbarItems.push({
      location: (btn.location || 'before') as const,
      widget: 'dxButton' as const,
      options: {
        text: btn.text,
        icon: btn.icon,
        onClick: btn.onClick,
        type: btn.type || 'normal',
        disabled: btn.disabled || false,
      },
    });
  });

  if (enableExport) {
    toolbarItems.push({
      location: 'after' as const,
      widget: 'dxButton' as const,
      options: {
        text: exportButtonText,
        onClick: () => {
          console.log('Export button clicked');
          const instance = gridRef.current?.instance();
          console.log('Instance:', instance);
          console.log('Instance methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(instance || {})));
          if (instance) {
            // Check available export methods
            if (typeof instance.exportToExcel === 'function') {
              instance.exportToExcel();
            } else if (typeof instance.export === 'function') {
              instance.export();
            } else {
              console.error('No export method found on instance');
              // Manually trigger onExporting event
              handleExporting({ component: instance, cancel: false });
            }
          }
        },
      },
    });
  }
  if (enableColumnChooser) {
    toolbarItems.push({
      location: 'after' as const,
      widget: 'dxButton' as const,
      options: {
        text: columnChooserButtonText,
        onClick: () => {
          const instance = gridRef.current?.instance();
          if (instance) {
            instance.showColumnChooser();
          }
        },
      },
    });
  }

  if (enableSaveLayout) {
    toolbarItems.push({
      location: 'after' as const,
      widget: 'dxButton' as const,
      options: {
        text: saveLayoutButtonText,
        icon: 'save',
        type: 'success',
        onClick: () => {
          const instance = gridRef.current?.instance();
          if (instance) {
            // Save current state to localStorage
            const state = instance.state();
            localStorage.setItem(`datagrid-state-${id}`, JSON.stringify(state));

            // Optional: Show notification
            console.log('Table layout saved successfully');
          }
        },
      },
    });
  }

  // Determine if title should have 'ab' class (when toolbar has items)
  const hasToolbarItems = toolbarItems.length > 0;
  const titleClassName = hasToolbarItems ? 'title-grid ab' : 'title-grid';

  return (
    <div className="nexus-datagrid-wrapper">
      {title && (
        <h1 className={titleClassName}>{title}</h1>
      )}
      <DevExtremeDataGrid
        ref={gridRef}
        id={id}
        className="nexus-datagrid"
        dataSource={dataSource}
        keyExpr={keyExpr}
        showBorders={true}
        allowColumnResizing={true}
        allowColumnReordering={enableColumnReordering}
        columnResizingMode="widget"
        onContentReady={handleContentReady}
        onRowClick={onRowClick}
        onSelectionChanged={onSelectionChanged}
        onSaved={onSaved}
        onExporting={enableExport ? handleExporting : undefined}
        {...customConfig}
      >
        {columns.map((col: any, index) => {
          const renderColumn = (column: any, idx: number): React.ReactElement => {
            // Handle button type columns
            if (column.type === 'buttons') {
              return (
                <Column
                  key={`buttons-${idx}`}
                  type="buttons"
                  width={column.width}
                  caption={column.caption}
                  buttons={column.buttons}
                  showInColumnChooser={column.showInColumnChooser !== false}
                  fixed={false}
                />
              );
            }

            // Handle regular columns
            return (
              <Column
                key={`${column.dataField || column.caption}-${idx}`}
                dataField={column.dataField}
                caption={column.caption}
                width={column.width}
                alignment={column.alignment}
                visible={column.visible !== false}
                allowEditing={column.allowEditing}
                allowHiding={true}
                dataType={column.dataType}
                format={column.format}
                cellRender={column.cellRender}
                calculateCellValue={column.calculateCellValue}
                customizeText={column.customizeText}
                groupIndex={column.groupIndex}
                allowFiltering={column.allowFiltering}
                visibleIndex={column.visibleIndex}
                lookup={column.lookup}
                filterOperations={column.filterOperations}
              >
                {column.columns?.map((nestedCol: any, nestedIdx: number) => renderColumn(nestedCol, nestedIdx))}
              </Column>
            );
          };
          return renderColumn(col, index);
        })}

        {enablePaging && (
          <>
            <Paging defaultPageSize={pageSize} />
            <Pager
              visible={true}
              showPageSizeSelector={true}
              allowedPageSizes={allowedPageSizes}
            />
          </>
        )}

        {enableExport && (
          <Export
            enabled={true}
            fileName={exportFileName}
          />
        )}

        {enableSelection && selectionMode !== 'none' && (
          <Selection mode={selectionMode} showCheckBoxesMode="always" />
        )}

        {enableEditing && (
          <Editing
            mode={editingMode}
            allowUpdating={allowUpdating}
            allowAdding={allowAdding}
            allowDeleting={allowDeleting}
          />
        )}

        <HeaderFilter visible={enableHeaderFilter} />
        <FilterRow visible={enableFilterRow} />

        <Scrolling
          mode={scrollingMode}
          showScrollbar="always"
          useNative={true}
        />

        {enableColumnChooser && <ColumnChooser enabled={true} mode="select" />}

        {enableColumnReordering && <ColumnFixing enabled={true} />}

        <StateStoring
          enabled={true}
          type="localStorage"
          storageKey={`datagrid-state-${id}`}
        />

        {toolbarItems.length > 0 && (
          <Toolbar>
            {toolbarItems.map((item, index) => (
              <Item key={index} {...item} />
            ))}
          </Toolbar>
        )}

        {enableGrouping && (
          <>
            <GroupPanel visible={enableGroupPanel} />
            <Grouping autoExpandAll={autoExpandAll} />
          </>
        )}

        {enableSummary && (summaryItems.length > 0 || groupSummaryItems.length > 0) && (
          <Summary>
            {summaryItems.map((item, index) => (
              <TotalItem
                key={`total-${index}`}
                column={item.column}
                summaryType={item.summaryType}
                displayFormat={item.displayFormat}
                valueFormat={item.valueFormat}
              />
            ))}
            {groupSummaryItems.map((item, index) => (
              <GroupItem
                key={`group-${index}`}
                column={item.column}
                summaryType={item.summaryType}
                displayFormat={item.displayFormat}
                valueFormat={item.valueFormat}
                alignByColumn={item.alignByColumn}
                showInGroupFooter={item.showInGroupFooter}
              />
            ))}
          </Summary>
        )}
      </DevExtremeDataGrid>
    </div>
  );
};

export default DataGrid;
