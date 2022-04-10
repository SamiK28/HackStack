import React, { useState, useEffect } from 'react'
import Search from '../../../components/search'
import Header2 from '../../../components/header2'
import Card from '../../../components/card'
import { ChevronDownIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getNumber } from './rand_int'
import { set } from 'lodash'

export default function Result({ name }) {
  const [hi0, setHi0] = useState('hidden')
  const [hi1, setHi1] = useState('hidden')
  const [hi2, setHi2] = useState('hidden')
  const [hi3, setHi3] = useState('hidden')
  const [hi4, setHi4] = useState('hidden')
  const [hi5, setHi5] = useState('hidden')

  // const filters = getArrRes(arr)

  const [arr, setArr] = useState([])
  const [ffg, setffg] = useState([])
  const [active, setActive] = useState({})
  const [amain, setAmain] = useState([])
  function pascalCase(w) {
    const ar2 = w.split('-')
    if (ar2.length === 1) {
      return w[0].toUpperCase() + w.slice(1).toLowerCase()
    }

    var res = []
    for (let i = 0; i < ar2.length; i++) {
      res.push(ar2[i][0].toUpperCase() + ar2[i].slice(1).toLowerCase())
    }
    return res.join(' ')
  }

  const [all, setAll] = useState(true)
  const [nat, setNat] = useState(false)
  const [fash, setFash] = useState(false)
  const [food, setFood] = useState(false)
  const [monu, setMonu] = useState(false)
  const [wea, setWea] = useState(false)
  const [adv, setAdv] = useState(false)

  var filters = []
  const toggle1 = () => {
    setAmain(arr)
    setAll(true)
    setNat(false)
    setFood(false)
    setFash(false)
    setMonu(false)
    setWea(false)
    setAdv(false)
  }
  const toggle2 = () => {
    if (all) setAll(false)
    setCity(!city)
  }
  const toggle3 = () => {
    if (all) setAll(false)
    setFood(!food)
  }
  const toggle4 = () => {
    if (all) setAll(false)
    setFash(!fash)
  }
  const toggle5 = () => {
    if (all) setAll(false)
    setMonu(!monu)
  }
  const toggle6 = () => {
    if (all) setAll(false)
    setWea(!wea)
  }
  const toggle7 = () => {
    if (all) setAll(false)
    setAdv(!adv)
  }

  useEffect(() => {
    const getData = async () => {
      console.log('QuertL ', name)
      const res = await fetch('http://localhost:5000/query', {
        body: JSON.stringify({
          query: name,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })
      const result = await res.json()
      var temp = []
      var temp2 = []
      var yu = {}
      Object.keys(result).map(function (key) {
        temp.push(result[key])
        Object.keys(result[key]).map(function (val) {
          //console.log(result[key][val]);
          if (result[key][val] == 1) {
            temp2.push(val)
          }
        })
      })
      const un = Array.from(new Set(temp2))
      un.forEach((value, index, array) => {
        yu[value] = false
      })
      setffg(un)
      setActive(yu)
      setArr(temp)
      setAmain(temp)
      // console.log(un.length)
      // console.log(arr.length)
      // console.log(hi0)
      // setAmain(temp)

      // for (let i = 0; i < ffg.length; i++) {
      //   if (ffg[i] === 'food') setHi0('')
      //   else if (ffg[i] === 'fashion') setHi1('')
      //   else if (ffg[i] === 'monument') setHi2('')
      //   else if (ffg[i] === 'adventure') setHi3('')
      //   else if (ffg[i] === 'weather') setHi4('')
      //   else if (ffg[i] === 'nature') setHi5('')
      // }
    }

    getData()
  }, [])

  // function tgg(value) {
  //   // useEffect(() => {

  //   // })

  // }
  // useEffect(() => {

  //   var temp = []
  //   if (fash) temp.push('fashion')
  //   else {
  //     var myIndex = temp.indexOf('fashion')
  //     if (myIndex !== -1) {
  //       temp.splice(myIndex, 1)
  //     }
  //   }

  //   if (food) temp.push('food')
  //   else {
  //     var myIndex = temp.indexOf('food')
  //     if (myIndex !== -1) {
  //       temp.splice(myIndex, 1)
  //     }
  //   }

  //   if (monu) temp.push('monument')
  //   else {
  //     var myIndex = temp.indexOf('monument')
  //     if (myIndex !== -1) {
  //       temp.splice(myIndex, 1)
  //     }
  //   }

  //   if (adv) temp.push('adventure')
  //   else {
  //     var myIndex = temp.indexOf('adventure')
  //     if (myIndex !== -1) {
  //       temp.splice(myIndex, 1)
  //     }
  //   }

  //   if (wea) temp.push('weather')
  //   else {
  //     var myIndex = temp.indexOf('weather')
  //     if (myIndex !== -1) {
  //       temp.splice(myIndex, 1)
  //     }
  //   }

  //   if (nat) temp.push('nature')
  //   else {
  //     var myIndex = temp.indexOf('nature')
  //     if (myIndex !== -1) {
  //       temp.splice(myIndex, 1)
  //     }
  //   }
  //   console.log('Filters active: ', temp)
  // }, [nat, fash, food, monu, wea, adv])
  // useEffect(() => {

  //   for (let i = 0; i < filters.length; i++) {
  //     if (filters[i] === 'food') setHi0('')
  //     else if (filters[i] === 'fashion') setHi1('')
  //     else if (filters[i] === 'monument') setHi2('')
  //     else if (filters[i] === 'adventure') setHi3('')
  //     else if (filters[i] === 'weather') setHi4('')
  //     else if (filters[i] === 'nature') setHi5('')
  //   }
  // })

  const [rmi, setRmi] = useState(false)
  const toggleRead = () => {
    setRmi(!rmi)
  }
  return (
    <>
      <Header2 />
      <Search />
      <div className="grid-cols-5 py-8 px-24 md:grid md:pl-56">
        <div className="justify-items-center md:col-start-3">
          <h1 className="text-2xl font-semibold">Explore {pascalCase(name)}</h1>
        </div>
      </div>
      <div className="mb-10 grid-cols-5 justify-items-center py-4 px-16 md:mx-2 md:grid md:px-0">
        <div className="md:col-span-3 md:col-start-2">
          <span className="font-semibold text-[#6E6D7A]">Filter by:</span>
          {ffg.map((value, index) => {
            return (
              <button
                className={active[value] ? 'act' : 'inact'}
                onClick={() => {
                  const mm = active
                  mm[value] = !mm[value]

                  setActive(mm)

                  var check
                  Object.keys(active).map(function (key) {
                    check = check || active[key]
                  })
                  console.log(check)
                  var temp = amain

                  if (check) {
                    var f = arr.filter(function (obj) {
                      if (obj[value] == 1 && active[value]) {
                        return obj
                      }
                    })
                    console.log('LEN: ', f.length)
                    setArr(f)
                  } else {
                    setArr(temp)
                  }
                }}
              >
                {pascalCase(value)}
              </button>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 px-6 md:ml-12 md:grid-cols-3 md:px-16">
        {arr.map((place, key) => {
          const a = getNumber(place.city)
          const t =
            '/images/' +
            place.city +
            '/' +
            place.city +
            '(' +
            String(a) +
            ')' +
            '.jpg'

          return arr.length === 0 ? (
            <div>Loading...</div>
          ) : (
            
              <div className="h-120 md:w-120 hover:z-4 relative mb-6 max-w-sm cursor-pointer rounded bg-white shadow-lg md:hover:scale-105">
                <img className="w-120 h-80" src={t} alt={place.name} />
                <div className="px-6 py-4">
                  <div className="mb-2 grid justify-items-center  text-xl font-bold">
                    {pascalCase(place.city)}
                  </div>
                  <p className="text-base text-gray-700">{place.summary}</p>
                </div>
                <div className={rmi ? 'h-auto py-6' : 'hidden'}>
                  <p className="py-1 text-base font-semibold">Summary</p>
                  {arr.summary}
                </div>
                <div className="grid justify-items-end px-6 py-4 text-base">
                  <div
                    className="absolute bottom-4 right-8 text-[#FD507E] underline-offset-2 hover:underline"
                    onClick={toggleRead}
                  >
                    Read {rmi ? 'Less' : 'More'}
                  </div>
                </div>
              </div>
           
          )
        })}
      </div>
    </>
  )
}

Result.getInitialProps = async ({ query }) => {
  const { name } = query
  return { name }
}
