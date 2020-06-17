local grafana = import 'vendor/grafonnet/grafana.libsonnet';
local dashboard = grafana.dashboard;
local template = grafana.template;
local tablePanel = grafana.tablePanel;

dashboard.new(
  // Gets converted to slug URL => /d/grafana-pcp-app-table-preview/table-preview
  title='Table Preview',
  uid='grafana-pcp-app-table-preview',
  editable=false,
  tags=['grafana-pcp-up'],
  time_from='now-1m',
  time_to='now+1m',
  refresh='1s',
  timepicker=grafana.timepicker.new(
    refresh_intervals=['1s', '2s', '5s', '10s'],
  )
)
.addTemplate(
  template.datasource(
    name='datasource',
    // datasource ID
    query='pcp-vector-datasource',
    current='PCP Vector',
    hide='variable',
  ) + {
    options: ['PCP Vector'],
  },
)
.addTemplate(
  template.custom(
    name='entity',
    query='',
    current='',
    label='Entity',
    hide='label',
  )
)
.addPanel(
  tablePanel
    .new(
      title='Table Preview',
      span=1,
      datasource='$datasource',
    )
    .addTarget({
      expr: '$entity',
      format: 'metrics_table'
    }),
    gridPos ={
      x: 0,
      y: 0,
      w: 24,
      h: 24,
    }
)
