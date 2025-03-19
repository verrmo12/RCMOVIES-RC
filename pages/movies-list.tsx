"use client"

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Layout from "../components/layout/Layout"
import Header from "../components/Header"
import Container from "../components/container"

function MyList() {
  const { MyList } = useSelector((state: any) => state)
  const [data, setData] = useState<any>([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const url = `https://api.themoviedb.org/3/trending/tv/week?api_key=cfe422613b250f702980a3bbf9e90716`
    const req = await fetch(url)
    const res = await req.json()
    setData(res.results)
  }

  return (
    <>
      <Header Data={data} />
      <Layout title="My List">
        <div className="mt-[-10rem]">
          <Container Data={MyList} heading="My List" place="" />
        </div>
      </Layout>
    </>
  )
}

export default MyList

