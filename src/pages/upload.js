import { useState } from 'react'
import { Tab } from '@headlessui/react'
import Slider from '../utils/Slider'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
function params(worker) {
  let ret = []
  let idx = 0
  for(let w in worker.params){
    let p = worker.params[w]
    ret.push(
      <li
        key={idx}
        className="relative p-3 rounded-md hover:bg-coolGray-100"
      >
        {/* <h3 className="text-sm font-medium leading-5">
          {w}
        </h3> */}
        <Slider min={p.min} max={p.max} de={p.def} step={p.step} name={w} hook={(value)=>{}}/>
      </li>
    )
    idx += 1
  }

  return(
    ret
  //   <ul className="flex mt-1 space-x-1 text-xs font-normal leading-4 text-coolGray-500">
  //     <li>{post.date}</li>
  //     <li>&middot;</li>
  //     <li>{post.commentCount} comments</li>
  //     <li>&middot;</li>
  //     <li>{post.shareCount} shares</li>
  //   </ul>

  //   <a
  //     href="#"
  //     className={classNames(
  //       'absolute inset-0 rounded-md',
  //       'focus:z-10 focus:outline-none focus:ring-2 ring-blue-400'
  //     )}
  //   />
  // </li>
  )
}

export default function Example() {

  let [categories] = useState({
    RealESRGan: {
      name: "RealESRGan",
      disabled: false,
      params: {
        sf: { min: 2, max: 4, def: 4, step: 1 }
      },
    },

    USRGan: {
      name: "USRGan",
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
      params: {
        sf: { min: 2, max: 4, def: 4, step: 1 }
      },
    }
  }
  )
  return (
    <div className="w-full max-w-md px-2 py-16 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
          {Object.keys(categories).map((category) => {
            return (
              <Tab
                disabled={categories[category].disabled}
                key={category}
                className={({ selected }) =>
                  classNames(
                    'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg',
                    'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                    selected
                      ? 'bg-white shadow'
                      : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                  )
                }
              >
                {category}
              </Tab>
            )
          })
          }
        </Tab.List>
        <Tab.Panels className="mt-2">
          {Object.values(categories).map((posts) => (
            <Tab.Panel
              // key={idx}
              className={classNames(
                'bg-white rounded-xl p-3',
                'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
              )}
            >
              {params(posts)}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}


