
export default function ColorList(props) {

    function chooseColor(event) {
        props.setColor(color => {
            let hue = event.target.getAttribute('hue')
            let sat = event.target.getAttribute('sat')
            let light = event.target.getAttribute('light')
            return [hue, sat, light]
        })
        document.documentElement.style.setProperty('--hue', event.target.getAttribute('hue'))
        document.documentElement.style.setProperty('--sat', event.target.getAttribute('sat')+"%")
        document.documentElement.style.setProperty('--lightness', event.target.getAttribute('light')+"%")
        props.handleSettings()
    }

    return (
      props.colors.map(color => {
        return <div className='color' id={color.id} key={color.id} hue={color.hue} sat={color.sat} light={color.light} onClick={chooseColor}></div>
      })
    )
  }