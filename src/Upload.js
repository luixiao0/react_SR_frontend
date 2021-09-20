import React from 'react'
import { Tab } from '@headlessui/react'
import Slider from './components/slider/Slider'
// import { Transition } from '@headlessui/react'
import './Upload.css'

class ParamSlider extends React.Component {
  constructor(props) {
    super(props)
    this.categories = {
      anime: {
        name: "anime",
        disabled: false,
        params: {
          sf: { min: 2, max: 4, def: 4, step: 1 }
        }
      },

      realworld: {
        name: "realworld",
        disabled: false,
        params: {
          sf: { min: 2, max: 4, def: 2, step: 1 },
          noise: { min: 0, max: 16, def: 2, step: 0.1 },
          kw: { min: 0, max: 16, def: 0, step: 0.1 },
        }
      },

      coming_soon: {
        name: "coming_soon",
        disabled: true,
        params: {},
      }
    }
  }

  classNames = (...classes) => {
    return classes.filter(Boolean).join(' ')
  }

  params = (worker) => {
    let ret = []
    for (let w in worker.params) {
      let p = worker.params[w]
      ret.push(
        <Slider key={w} min={p.min} max={p.max} de={p.def} step={p.step} name={w} hook={this.props.onParamChange} />
      )
    }
    return ret
  }


  render() {
    return (
      <div className="w-full px-2 mt-2">
        <Tab.Group
          onChange={this.props.onTabChange}>
          <Tab.List className="flex p-1 rounded-xl bg-white dark:bg-gray-900 shadow-sm space-x-1 bg-opacity-60 ">
            {Object.keys(this.categories).map((category) => {
              return (
                <Tab
                  disabled={this.categories[category].disabled}
                  key={category}
                  className={({ selected }) => {
                    let style = 'text-black-700 hover:bg-white dark:hover:bg-gray-800'
                    if (selected) {
                      style = ' bg-white dark:bg-gray-900 hover:bg-white/[0.90] hover:text-blue-700 shadow-md'
                    }
                    if (this.categories[category].disabled) {
                      style = 'opacity-30'
                    }
                    return (this.classNames(
                      'w-full py-3 px-2 duration-300 leading-loose font-medium focus:outline-none text-sm leading-5 rounded-lg ' + style)
                    )
                  }
                  }
                >
                  {category}
                </Tab>
              )
            })
            }
          </Tab.List>
          <Tab.Panels className="mt-2">
            {Object.values(this.categories).map((posts) => (
              <Tab.Panel
                key={posts.name}
                className={this.classNames(
                  'bg-white dark:bg-gray-900 shadow-sm rounded-xl p-3 focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
                )}
              >
                {this.params(posts)}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    )
  }
}

export default ParamSlider

