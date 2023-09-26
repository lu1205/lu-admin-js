export const getEleHeight = (ele) => {
  const marginTop =
    Number(getComputedStyle(ele).getPropertyValue('margin-top').replace('px', '')) || 0
  const marginBottom =
    Number(getComputedStyle(ele).getPropertyValue('margin-bottom').replace('px', '')) || 0
  return ele.offsetHeight + marginTop + marginBottom
}
