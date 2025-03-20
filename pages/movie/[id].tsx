import { GetServerSideProps, GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import Container from "../../components/container/Container";
import Watching from "../../components/episodewatching/Watching";
import { useSelector, useDispatch } from "react-redux";
import { addToMyList, removeFromList } from "../../redux/actions/myListAction";
import DetailContainer from "../../components/details/DetailContainer";
import HomeContainer from "../../components/container/HomeContainer";
import { FaPlay } from "react-icons/fa";
import { GrAdd } from "react-icons/gr";
import { AiFillYoutube } from "react-icons/ai";
import { SetContinueWatching } from "../../redux/actions/tvShowAction";
import EnimePlayer from "../../components/player/Player";



const s = [
  {
  "url": "https://ccb.megaresources.co/56/26/5626ce43b9c4f3419805884cba4b0505/ara-6.vtt",
  "lang": "Arabic"
  },
  {
  "url": "https://ccb.megaresources.co/56/26/5626ce43b9c4f3419805884cba4b0505/eng-2.vtt",
  "lang": "English"
  },
  {
  "url": "https://ccb.megaresources.co/56/26/5626ce43b9c4f3419805884cba4b0505/fre-7.vtt",
  "lang": "French"
  },
  {
  "url": "https://ccb.megaresources.co/56/26/5626ce43b9c4f3419805884cba4b0505/ger-8.vtt",
  "lang": "German"
  },
  {
  "url": "https://ccb.megaresources.co/56/26/5626ce43b9c4f3419805884cba4b0505/ita-9.vtt",
  "lang": "Italian"
  },
  {
  "url": "https://ccb.megaresources.co/56/26/5626ce43b9c4f3419805884cba4b0505/por-3.vtt",
  "lang": "Portuguese - Portuguese(Brazil)"
  },
  {
  "url": "https://ccb.megaresources.co/56/26/5626ce43b9c4f3419805884cba4b0505/rus-10.vtt",
  "lang": "Russian"
  },
  {
  "url": "https://ccb.megaresources.co/56/26/5626ce43b9c4f3419805884cba4b0505/spa-5.vtt",
  "lang": "Spanish"
  },
  {
  "url": "https://ccb.megaresources.co/56/26/5626ce43b9c4f3419805884cba4b0505/spa-4.vtt",
  "lang": "Spanish - Spanish(Latin_America)"
  }
  ]

function timeConvert(n: any) {
  var num = n;
  var hours = num / 60;
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);
  return rhours + "h " + rminutes + "m.";
}

export default function MovieEpisode(resp: any,tmdb:any) {
  const [data, setData] = useState<any>(resp.resp);
  const [recommended, setRecommended] = useState<any>([]);
  const [casts, setCasts] = useState<any>([]);
  const [movieData, setMovieData] = useState<any>([]);
  const [stream, setStream] = useState<any>([]);
  const { MyList,ContinueWatching } = useSelector((state: any) => state);
  const [click, setClick] = useState(false);
  const dispatch = useDispatch();
  const [source, setSource] = useState<any>()

  const router = useRouter();
  const { id } = router.query;
  const eps: any = [];

  const [imdbId, setImdbId] = useState<any>([]);
  const [imdbData, setImdbData] = useState<any>([]);
  const ref = useRef();

  console.log(data);

  const subs :any = []
  const subtitles = () => {
    for (let i=0;i<s.length;i++) { subs.push({default : false,name:s[i]?.lang,src:s[i].url}) }
    return subs
  } 

  console.log(subtitles())

  useEffect(() => {
    fetchRecommended();
    fetchImdbId();
    fetchCasts();
    setData(resp.resp)
    
    const current = MyList.filter((item: any) => item.id == id);
    current.length > 0 ? setClick(true) : setClick(false);
  }, [id, imdbId, resp]);


console.log(resp)
  const handleIframe  = () => {

    const currentWatching = ContinueWatching.filter((item: any) => item.id == id);
  if(currentWatching.length > 0) {
    console.log("nothing")
  }else{
    dispatch(
      SetContinueWatching({
        id: id,
        poster_path: data?.poster_path,
        backdrop_path: data?.backdrop_path,
        title: data?.title,
        media_type: "movie",
        time: Date.now(),
      }),
    );
  }

  }
  

  const fetchData = async () => {
    let url = `https://api.themoviedb.org/3/movie/${id}?&api_key=cfe422613b250f702980a3bbf9e90716`;
    let req = await fetch(url);
    let res = await req.json();
    setData(res);

    setImdbData({
      rating: res.vote_average,
      votes: res.vote_count,
    });
  };

  const fetchImdbId = async () => {
    let url = `https://api.themoviedb.org/3/movie/${id}/external_ids?api_key=cfe422613b250f702980a3bbf9e90716`;
    let req = await fetch(url);
    let res = await req.json();
    setImdbId(res.imdb_id);
  };

  const fetchRecommended = async () => {
    const url = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=cfe422613b250f702980a3bbf9e90716`;
    let req = await fetch(url);
    let res = await req.json();
    setRecommended(res.results);
  };

  const fetchCasts = async () => {
    const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=cfe422613b250f702980a3bbf9e90716`;
    let req = await fetch(url);
    let res = await req.json();
    setCasts(res.cast);
  };

  console.log(MyList);
  return (
    <>
      <div className="w-full relative mx-auto ">
            <DetailContainer {...data} media_type="movie"/>
        <div className="gap-4">
          
          
          <div className=" mx-auto mt-8">
            <iframe
            onLoadCapture={handleIframe}
              className="p-2 w-full h-[270px] lg:h-[872px] mx-auto"

               src={`https://embed.su/embed/movie/${id}`}

              //src={`https://vidlink.pro/movie/${id}`}
              allowFullScreen
            ></iframe>

            <HomeContainer swiperId={1} Data={casts} heading="Casts" />

            <Container
              Data={recommended}
              heading="MOVIES YOU MAY ALSO LIKE"
              place="movie"
            />
          </div>
        </div>
      </div>
    </>
  );
}




export async function getStaticPaths() {
  return { paths: [], fallback: "blocking" };
}


export const getStaticProps = async (context: any) => {
  let id = context.params.id;
  let url1 = `https://api.themoviedb.org/3/movie/${id}?api_key=cfe422613b250f702980a3bbf9e90716`;
  let req1 = await fetch(url1);
  let resp = await req1.json();
  return { props: { resp } };
};


