import { Tooltip, Tag } from 'antd'

const Tooltips = (params) => {
  const scale = params.params.scale
  const anime = params.params.anime
  if (anime) {
    return (
      <>
        <Tooltip title="放大倍数"><Tag>{scale}x</Tag></Tooltip>
        <Tooltip title="动漫图片"><Tag color="cyan">动漫图片</Tag></Tooltip>
      </>
    )
  }
  else {
    return (
      <>
        <Tooltip title="放大倍数"><Tag>{scale}x</Tag></Tooltip>
        <Tooltip title="真实图片"><Tag color="blue">真实图片</Tag></Tooltip>
      </>
    )
  }
}

export default Tooltips