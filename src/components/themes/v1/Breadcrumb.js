import { useTranslation } from "react-i18next";
import { Breadcrumb as BSBreadcrumb } from "react-bootstrap";
import { getUrlSegments } from 'utils/urlHelper'

const Breadcrumb = props => {
  const { t } = useTranslation();

  const segments = getUrlSegments()
  if (!Array.isArray(segments) || segments.length <= 0) {
    return null;
  }

  return (
    <BSBreadcrumb>
      {segments.map((x, idx) => (
        <BSBreadcrumb.Item key={`brcm${idx}`} href={x.url}>{t(`menu.${x.name}`)}</BSBreadcrumb.Item>
      ))}
    </BSBreadcrumb>
  )
}

export default Breadcrumb
