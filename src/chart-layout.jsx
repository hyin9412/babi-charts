export function ChartCard({
  checkItem,
  checkItemTags,
  checkItemRemark,
  title,
  titleTags,
  status,
  ariaLabel = title,
  workspaceClassName = "workspace",
  panelClassName = "chart-panel",
  children,
}) {
  return (
    <section className="chart-group">
      <p className="check-item">
        <span className="check-item__main">
          <span>检测项：{checkItem}</span>
          {checkItemTags?.length ? (
            <span className="check-item__tags" aria-label="检测项标签">
              {checkItemTags.map((tag) => (
                <span className="title-tag" key={tag}>
                  {tag}
                </span>
              ))}
            </span>
          ) : null}
        </span>
        {checkItemRemark ? <span className="check-item__remark">{checkItemRemark}</span> : null}
      </p>
      <section className={workspaceClassName}>
        <div className="toolbar">
          <div className="toolbar__title">
            <h2>{title}</h2>
            {titleTags?.length ? (
              <div className="title-tags" aria-label="图表标签">
                {titleTags.map((tag) => (
                  <span className="title-tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
          {status ? <span className="status">{status}</span> : null}
        </div>
        <div className={panelClassName} aria-label={ariaLabel}>
          {children}
        </div>
      </section>
    </section>
  );
}

export function SingleChartPage({ children, ...cardProps }) {
  return <main><ChartCard {...cardProps}>{children}</ChartCard></main>;
}
