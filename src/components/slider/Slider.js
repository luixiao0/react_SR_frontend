import React, { useCallback, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import "./Slider.css";

// Wait until innerheight changes, for max 120 frames
// function orientationChanged() {
//   const timeout = 120;
//   return new window.Promise(function (resolve) {
//     const go = (i, height0) => {
//       window.innerHeight !== height0 || i >= timeout ?
//         resolve() :
//         window.requestAnimationFrame(() => go(i + 1, height0));
//     };
//     go(0, window.innerHeight);
//   });
// }

const Slider = ({ min, max, de, step, hook, name, thin }) => {
  const [cur, setCurrent] = useState(de);
  const [show, toggleShow] = useState(false);
  const [mousedown, setMouse] = useState(false);
  //   const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef(null);
  const slide = useRef(null);
  // Convert to percentage

  const getPercent = useCallback(
    (value) => {
      let delta = (value - min) / (max - min);
      return delta;
    },
    [min, max]
  );
  const handleClick = () => {
    toggleShow(!show)
    // console.log(show)
  }
  const regulate = () => {
    setCurrent((Math.round(cur / step) * step).toFixed(Math.ceil(-Math.log10(step))))
  }

  const inputChange = (e) => {
    // console.log(e)
    let d = e.target.value
    d = Math.min(Math.max(d, min), max)
    // console.log(d)
    if (d) {
      setCurrent(d)
    }
    else {
      setCurrent(de)
    }
  }

  const update = () => {
    const maxPercent = getPercent(cur);
    // console.log("update")
    if (range.current) {
      if (thin) {
        range.current.style.width = `${slide.current.clientWidth * maxPercent}px`;
      }
      else {
        const aux = (1 - maxPercent) * 18 + 9
        range.current.style.width = `${Math.max(maxPercent * slide.current.clientWidth + aux, 0)}px`;
      }
    }
    hook(name, Number(cur))
  }

  useEffect(update, [cur, getPercent, thin]);

  window.addEventListener('resize', update);


  const handleSlideClick = (width) => {
    let percent = (Math.round(width)) / slide.current.clientWidth
    let current = percent * (max - min) + min
    // console.log(width, current, percent)
    setCurrent(current)
  }

  return (
    <div className="select-none slidecontainer"
      onMouseDown={(e) => {
        setMouse(true)
        let width = e.clientX - e.currentTarget.getBoundingClientRect().left
        // console.log('md')
        handleSlideClick(width)
      }}
      
      onMouseUp={(e) => {
        setMouse(false)
        // console.log('mup')
        setTimeout(() => {
          setCurrent(Math.min(Math.max(Number(cur).toFixed(Math.ceil(-Math.log10(step))), min), max))
        }, 50)
      }}
      onMouseMove={(e) => {
        if (mousedown) {
          let width = e.clientX - e.currentTarget.getBoundingClientRect().left
          // console.log('mm')
          handleSlideClick(width)
        }
      }}


      onTouchMove={(e) => {
        // console.log('tm')
        let width = e.changedTouches[0].clientX - e.currentTarget.getBoundingClientRect().left
        handleSlideClick(width)
      }}
      onTouchStart={(e) => {
        let width = e.changedTouches[0].clientX - e.currentTarget.getBoundingClientRect().left
        handleSlideClick(width)
      }}
      onTouchEnd={() => {
        // console.log('te')
        setCurrent(Math.min(Math.max(Number(cur).toFixed(Math.ceil(-Math.log10(step))), min), max))
      }}
    >

      <div ref={slide} className="slider mx-1">
        <input
          type="range"
          min={min}
          max={max}
          value={cur}
          step={0.02}
          onChange={(event) => {
            const value = event.target.value;
            // console.log(value)
            setCurrent(value);
            maxValRef.current = value;
          }}
          onMouseUp={regulate}
          onTouchEnd={regulate}
          className="select-none thumb"
        ></input>
        <div className="slider__track" />
        <div
          ref={range}
          onClick={(e) => { handleSlideClick(e.clientX - e.currentTarget.getBoundingClientRect().left) }}
          className={thin ? "slider__range thin" : "slider__range thick"}
        />
        <div className="slider__left-value select-none">{min}</div>
        {show ?
          <div>
            <input className="slider__right-value rounded-xl bg-gray-100 dark:bg-gray-700 px-1"
              type="number"
              autoFocus
              value={cur}
              max={max}
              min={min}
              step={step}
              onBlur={handleClick}
              onChange={e => inputChange(e)} />
          </div> :
          <div onClick={handleClick} className="select-none rounded-xl bg-white dark:bg-gray-900 shadow-sm px-1 shadow slider__right-value">{name}:[{(Math.round(cur / step) * step).toFixed(0.1 / step)}]/{max}</div>
        }


        {/* <div onClick={handleClick} className="slider__right-value">{name}:[{cur}]/{max}</div> */}
        {/* <div className="slider-value">{cur}</div> */}
      </div>
    </div>
  );
};

Slider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  de: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  hook: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  thin: PropTypes.bool,
};

export default Slider;
