import React from 'react'
import Search from '../components/search'
import Header from '../components/header'
import Item from '../components/Item'
import Link from 'next/link'
import Carousel from 'react-elastic-carousel'
import { getNumber } from './result/[name]/rand_int'
const places = [
  {
    url: 'paris',
    name: 'Paris',
    line: 'City of Lights',
  },
  {
    url: 'dubai',
    name: 'Dubai',
    line: 'The Modern Oasis',
  },
  {
    url: 'new-york',
    name: 'New York',
    line: 'The Big Apple',
  },
  {
    url: 'singapore',
    name: 'Singapore',
    line: 'The Lion City',
  },
  {
    url: 'rome',
    name: 'Rome',
    line: 'The Eternal City',
  },
  {
    url: 'venice',
    name: 'Venice',
    line: 'City of Canals',
  },
  {
    url: 'barcelona',
    name: 'Barcelona',
    line: 'The Catalan Wonder',
  },
  {
    url: 'budapest',
    name: 'Budapest',
    line: 'The pearl of Danube',
  },
  {
    url: 'prague',
    name: 'Prague',
    line: 'City of a Hundred Spires',
  },
  {
    url: 'london',
    name: 'London',
    line: 'Melting pot of cultures',
  },
  {
    url: 'milan',
    name: 'Milan',
    line: 'Fashion Capital of Italy',
  },
]
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 2000, itemsToShow: 4 },
]

export default function Home() {
  return (
    <div>
      <Header height={'100'} color={'#FD507E'} />
      <Search />
      <div className="grid-cols-3 py-8 px-16 md:grid md:px-0">
        <div className="col-span-2 md:col-start-2 md:ml-12">
          <span className="font-semibold text-[#6E6D7A]">Suggested:</span>
          {places.map((place, key) => {
            if (key < 6)
              return (
                <span className="px-2 text-[#EA4C89] hover:text-[#e68daf]">
                  <Link href={`/result/${place.url}`}>{place.name}</Link>
                </span>
              )
          })}
        </div>
      </div>
      <div className="justify-items-center bg-[#F1F1F1] py-8 px-1 md:px-8">
        <Carousel breakPoints={breakPoints}>
          {places.map((place, key) => {
            const a = 0
            const t =
              '/images/' +
              place.url +
              '/' +
              place.url +
              '(' +
              String(a) +
              ')' +
              '.jpg'

            return (
              <div className="h-100 my-4 flex justify-items-center text-6xl">
                <Link href={'/result/' + place.url}>
                  <div className="h-120 md:w-120 hover:z-4 mb-6 max-w-sm cursor-pointer rounded bg-white pb-6 shadow-lg md:hover:scale-105">
                    <img className="w-120 h-80" src={t} alt={place.name} />
                    <div className="px-6 py-4">
                      <div className="mb-2 grid justify-items-center text-xl font-bold">
                        {place.name}
                      </div>
                      <p className="grid justify-items-center py-3 text-base text-gray-700">
                        {place.line}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            )
          })}
        </Carousel>
      </div>
    </div>
  )
}
