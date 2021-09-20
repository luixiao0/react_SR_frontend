import React, { useCallback, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import "./Slider.css";

const Slider = ({ min, max, de, step, hook, name, thin }) => {
  const [cur, setCurrent] = useState(de);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef(null);
  const slide = useRef(null);
  // Convert to percentage
  const getPercent = useCallback(
    (value) => {
      let delta = (value-min) /(max-min);
      return delta;
    },
    [min, max]
  );

  useEffect(() => {
    const maxPercent = getPercent(cur);
    
    if (range.current) {
      if (thin) {
        range.current.style.width = `${slide.current.clientWidth*maxPercent}px`;
      } 
      else {
        const aux = (1-maxPercent) * 18 + 9
        range.current.style.width = `${Math.max(maxPercent*slide.current.clientWidth + aux, 0)}px`;
      }
    }
  }, [cur, getPercent]);

  useEffect(() => {
    hook({ [name]: Number(cur) });
  }, [cur, hook]);

  return (
    <div className="container">
      <input
        type="range"
        min={min}
        max={max}
        value={cur}
        step={step}
        onChange={(event) => {
          const value = event.target.value;
          setCurrent(value);
          maxValRef.current = value;
        }}
        className="thumb"
      ></input>

      <div ref={slide} className="slider">
        <div className="slider__track" />
        <div
          ref={range}
          className={thin ? "slider__range thin" : "slider__range thick"}
        />
        <div className="slider__left-value">{min}</div>
        <div className="slider__right-value">{max}</div>
        <div className="slider-value">{cur}</div>
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
