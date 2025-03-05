"use client";
import Banner from "@/components/banner";
import MangaPreview from "@/components/mangaPreview";
import MangaSlider from "@/components/mangaSlider";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axios";
import { useState, useEffect } from "react";
import { Manga, MangaListResponse } from "@/types/mainPageManga";
import { MangaSliderSkeleton } from "@/components/mangaSkeleton";
import Image from "next/image";
import { useDataCache } from "@/contexts/DataCacheContext";

export default function Home() {
  const [newMangas, setNewMangas] = useState<Manga[]>([]);
  const [updatedMangas, setUpdatedMangas] = useState<Manga[]>([]);
  const [popularMangas, setPopularMangas] = useState<Manga[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { getCachedData, setCachedData } = useDataCache();

  useEffect(() => {
    const fetchMangas = async () => {
      setIsLoading(true);
      try {
        // Check cache first
        const cacheKey = "new-mangas";
        const cachedData = getCachedData(cacheKey);

        if (cachedData) {
          console.log("Using cached new mangas data");
          setNewMangas(cachedData);
          setIsLoading(false);
          return;
        }

        const response = await axiosInstance.get<MangaListResponse>(
          "api/app/mangas?IsNew=true&IsUpdated=false&IsPopular=false&CurrentPage=1&PageSize=10",
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        console.log("ok", response.data.value);
        setNewMangas(response.data.value);
        // Cache the result
        setCachedData(cacheKey, response.data.value);
      } catch (error: any) {
        if (error.response) {
          console.log("Error status:", error.response.status);
          console.log("Error data:", error.response.data);
        } else {
          console.log("Error:", error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchMangas();
  }, []);

  useEffect(() => {
    const fetchMangas = async () => {
      try {
        // Check cache first
        const cacheKey = "updated-mangas";
        const cachedData = getCachedData(cacheKey);

        if (cachedData) {
          console.log("Using cached updated mangas data");
          setUpdatedMangas(cachedData);
          return;
        }

        const response = await axiosInstance.get<MangaListResponse>(
          "api/app/mangas?IsNew=false&IsUpdated=true&IsPopular=false&CurrentPage=1&PageSize=10",
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        console.log("ok", response.data.value);
        setUpdatedMangas(response.data.value);
        // Cache the result
        setCachedData(cacheKey, response.data.value);
      } catch (error: any) {
        if (error.response) {
          console.log("Error status:", error.response.status);
          console.log("Error data:", error.response.data);
        } else {
          console.log("Error:", error.message);
        }
      }
    };
    fetchMangas();
  }, []);

  useEffect(() => {
    const fetchMangas = async () => {
      try {
        // Check cache first
        const cacheKey = "popular-mangas";
        const cachedData = getCachedData(cacheKey);

        if (cachedData) {
          console.log("Using cached popular mangas data");
          setPopularMangas(cachedData);
          return;
        }

        const response = await axiosInstance.get<MangaListResponse>(
          "api/app/mangas?IsNew=false&IsUpdated=false&IsPopular=true&CurrentPage=1&PageSize=10",
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        console.log("ok", response.data.value);
        setPopularMangas(response.data.value);
        // Cache the result
        setCachedData(cacheKey, response.data.value);
      } catch (error: any) {
        if (error.response) {
          console.log("Error status:", error.response.status);
          console.log("Error data:", error.response.data);
        } else {
          console.log("Error:", error.message);
        }
      }
    };
    fetchMangas();
  }, []);

  const test = async (): Promise<void> => {
    try {
      const response = await axiosInstance.get("api/app/mangas/wrsdasdasd", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      console.log("ok", response.data);
    } catch (error: any) {
      if (error.response) {
        console.log("Error status:", error.response.status);
        console.log("Error data:", error.response.data);
      } else {
        console.log("Error:", error.message);
      }
    }
  };

  return (
    <div>
      <Banner />
      <div className="sm:container mx-auto relative z-10 lg:mt-[-10rem] md:mt-[-5rem] mt-[-2rem] mb-16">
        {isLoading ? (
          <MangaSliderSkeleton />
        ) : (
          <MangaSlider data={newMangas} title="New manga" />
        )}
      </div>
      <div className="sm:container mx-auto">
        {isLoading ? (
          <>
            <MangaSliderSkeleton />
            <MangaSliderSkeleton />
          </>
        ) : (
          <>
            <MangaSlider data={updatedMangas} title="Last updated manga" />
            <MangaSlider data={popularMangas} title="Most popular manga" />
          </>
        )}
      </div>
      oh, again Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Repellat, quos molestiae officiis nisi voluptatibus odit consectetur
      doloribus reiciendis iusto iure iste suscipit cum nesciunt alias tempora
      aperiam porro ullam neque deleniti perferendis maiores, voluptatum sunt
      est commodi! Blanditiis aperiam rerum, itaque repellendus vitae excepturi
      in cum corporis nesciunt non expedita quasi iusto nostrum? Vero quidem
      dolores repellendus, ipsam velit quis accusantium. Aut eveniet eligendi
      veniam, temporibus provident est culpa. Voluptate inventore omnis
      architecto quae ullam dolore necessitatibus nihil voluptates dolorum cum
      nemo aliquam sapiente incidunt, sint dolores ab minima fuga atque eum!
      Sunt sed et maxime error labore! Natus modi soluta, ipsa incidunt ut
      mollitia dolor accusantium molestiae suscipit harum nisi magni odit libero
      atque. Labore nihil odio quaerat amet tenetur eveniet eos dolorem nulla
      provident quo consectetur ab vero reprehenderit reiciendis eum iusto nemo
      quam illo accusamus ad necessitatibus, aliquam facere assumenda illum.
      Possimus animi corrupti, corporis odit iste culpa quo nesciunt voluptas
      sint provident aliquid, perferendis quas labore placeat magnam, est
      aperiam! Culpa quae, unde sit maiores aut accusantium modi atque
      architecto veritatis dolores. Quibusdam ad iste aut repudiandae
      consequuntur est nihil voluptas, deleniti officiis dolores iusto sed
      tempora, ullam blanditiis facilis recusandae suscipit consectetur deserunt
      doloremque ex? Pariatur soluta accusamus velit totam similique iusto,
      fugit architecto accusantium quam a voluptas eius quasi beatae excepturi
      culpa dolorem reprehenderit sequi adipisci laborum animi est! Saepe,
      dolores ut! Deserunt nobis rem nesciunt omnis molestiae illum inventore
      temporibus nostrum corrupti, blanditiis doloremque, reprehenderit vero
      totam hic ullam tempore neque cupiditate eum doloribus ducimus. Nihil
      magni voluptate natus consequatur voluptas! Excepturi atque sunt iste
      dicta fugit! Minima nam a repudiandae quaerat quae, voluptatem atque quasi
      sed, natus ut asperiores totam laboriosam ipsa repellendus accusantium,
      vel harum! Iure cumque quidem, modi amet ratione et nisi consectetur
      aliquam tenetur cupiditate ipsum voluptas deserunt delectus molestiae
      ullam debitis inventore numquam corrupti impedit itaque nemo error quia!
      Sunt est quam tenetur blanditiis! Voluptatem, deserunt veritatis. Veniam
      vel, dicta tenetur quia corporis nesciunt sit illo exercitationem quis
      eaque! Tenetur optio adipisci quod. Suscipit natus est, inventore beatae,
      quibusdam ducimus quisquam iste, ab nostrum laudantium deserunt? Dolor
      dignissimos nobis facilis! Ipsa, quis tenetur illum voluptate maiores,
      vero reprehenderit nemo quos perspiciatis aliquid, placeat dignissimos?
      Facere sequi omnis quod earum nulla hic quis nihil, laudantium porro
      impedit doloribus itaque, libero laborum placeat eum ab. Commodi quasi
      maiores suscipit necessitatibus vitae porro nostrum libero totam
      exercitationem reprehenderit. Doloremque, aspernatur ea! Obcaecati
      deserunt quo mollitia officiis, alias sequi minus commodi accusantium
      autem doloribus? Facere nulla repellendus, minima suscipit nesciunt
      assumenda ratione accusamus optio necessitatibus consequuntur. Deleniti
      blanditiis neque facere voluptatem fuga sed eius quam maiores doloremque!
      Totam optio incidunt iure cumque eos ipsam quam adipisci delectus fugiat
      consectetur. Perferendis, ut quis minima nihil optio perspiciatis velit
      odit sint asperiores dolorum nemo eveniet voluptates impedit, suscipit
      delectus excepturi, odio non? Id nobis tenetur dicta, ipsam eligendi
      nihil. Eveniet cupiditate eius tempora ipsum minima fuga qui nihil sit
      iure, assumenda, quo possimus! Doloribus libero aperiam cum quas
      dignissimos quia quasi, molestias at soluta rerum blanditiis veniam, vero,
      temporibus ipsam. Soluta corporis eum minus suscipit, eaque a natus ab
      velit, culpa saepe, cum libero ratione iure. Omnis fugiat excepturi quidem
      ratione vitae cum dolor quo quam molestiae iste aspernatur, a non, maiores
      ea. Nesciunt earum non voluptatem aspernatur ab rem veniam quo quibusdam
      accusantium pariatur dolorum consectetur impedit quis dicta at debitis
      nihil distinctio cum, ad animi veritatis quae sint repudiandae maxime.
      Quam voluptatem excepturi, itaque nulla deleniti qui beatae iste, corporis
      quas eligendi tempora possimus eos officia aut sit maxime, aliquam
      consectetur? Ex est temporibus asperiores aut inventore dicta voluptatum
      et eos, maiores velit quia repellat corporis illo ullam tenetur placeat
      ad, assumenda eligendi voluptatibus rem illum! Amet magnam tempora iure
      voluptatum. Rerum, dolorum. Dicta consequatur ipsam voluptas, quibusdam
      vero in aperiam. Suscipit soluta deleniti mollitia aliquam nobis, tempore
      fuga, odio dolorem perferendis molestiae inventore voluptas
      exercitationem? Et vitae ex beatae, amet dolor voluptas harum repellat
      numquam sit aliquam nulla iusto tempora tenetur eaque molestiae, quidem
      minima officia similique quod. Aut dolorum assumenda non, quis dignissimos
      sint ut nesciunt, voluptas magnam soluta porro alias distinctio animi
      architecto deserunt necessitatibus corporis dolor natus debitis beatae? A
      earum tempore voluptas, quo recusandae distinctio laborum nulla iusto
      accusantium vitae laboriosam incidunt saepe blanditiis aliquam quisquam?
      Fugiat sunt architecto quia reiciendis, assumenda sed, libero qui
      voluptates in, repellat excepturi! Eos provident suscipit consectetur
      dolore ducimus earum autem molestiae dolores nemo aliquid, incidunt minus
      expedita, maiores deserunt voluptatem, architecto praesentium illum
      impedit saepe. Tempore laboriosam eveniet quibusdam! Quis, aperiam iste!
      Officia ducimus possimus magnam quisquam explicabo, quas mollitia minus,
      odio ratione, illo vel. Distinctio obcaecati alias delectus laudantium
      minus libero exercitationem optio repellendus, officiis dicta, vero ab
      laboriosam enim sit sed inventore! Distinctio sapiente aliquid aspernatur
      et est! Tempore est maiores laborum voluptates necessitatibus beatae minus
      aliquam modi consectetur nihil. Esse, deserunt sed. Labore eligendi amet
      sit ut eaque aspernatur eveniet totam? Odit natus ipsum incidunt vitae
      officia, dolores quaerat error veniam porro doloribus? Saepe sapiente
      deserunt amet dignissimos placeat architecto, quam, qui facilis repellat
      neque a recusandae minima molestias omnis impedit explicabo quae molestiae
      tenetur sunt eveniet distinctio illo iste reprehenderit. Blanditiis
      mollitia labore id, non eveniet animi reiciendis culpa ducimus atque,
      aliquam suscipit ipsam placeat ratione dignissimos cupiditate, magnam illo
      perferendis officia similique explicabo! Dicta veniam sapiente delectus
      incidunt, reiciendis nam maiores! Hic, voluptates ea rem id asperiores
      nemo soluta in doloremque laboriosam veritatis modi placeat, architecto
      unde porro! Eos vel nemo cum quibusdam facere ipsa consectetur
      voluptatibus animi, corporis, a distinctio cumque reiciendis tempore quo
      nobis quae quod quis? Reiciendis eius doloribus adipisci, dolor nihil
      deserunt? Nulla eaque nesciunt porro quisquam, laudantium eius odit natus
      reprehenderit exercitationem cum, deserunt qui sapiente commodi placeat,
      ipsa repellat veniam mollitia. Ipsam cupiditate voluptatum impedit tenetur
      omnis itaque porro sed commodi. Delectus at iste expedita aliquam amet,
      quia eveniet dolorem. Eveniet sequi voluptates vero molestias suscipit,
      quasi reprehenderit repudiandae nam, explicabo nisi numquam! Enim magni
      voluptatibus saepe sapiente quas suscipit fugit illo tempora ipsam
      reprehenderit sunt molestiae, qui distinctio consequatur facere non et
      provident eaque, ab assumenda nisi accusamus libero nesciunt. Cupiditate
      numquam optio fugit tenetur? Provident magnam, dignissimos enim porro
      architecto soluta harum nemo quaerat, fugit mollitia nihil earum ipsam
      autem voluptates animi quia temporibus id hic inventore labore eum!
      Reprehenderit eligendi qui, nulla maxime velit eveniet sint perspiciatis
      earum temporibus quia, sequi nihil vel eum necessitatibus aliquid pariatur
      soluta fugit, deleniti debitis vero eos ipsam enim vitae? Deleniti debitis
      minus maxime commodi totam laboriosam suscipit aut qui fugit eaque
      accusantium id blanditiis distinctio ipsam est error voluptatum ea natus,
      saepe tenetur labore eligendi ut repellendus! Eos voluptate quam
      doloremque libero non, nulla quod eum vitae modi labore fugit. Magni
      architecto suscipit maiores ipsa id. A, amet ad nihil aperiam modi minus
      hic iusto dignissimos suscipit perspiciatis itaque quos illum, facilis
      quasi, quas voluptatibus quis quisquam inventore fuga id libero
      consequuntur in qui magni! Totam veritatis, quae eius minima accusamus
      nam, fugiat facere deleniti soluta tenetur iusto placeat a id et non,
      dolores molestiae? Itaque tempore voluptate eius? Obcaecati dolor nisi
      numquam tenetur dolore excepturi sequi error beatae quis rem ea unde quo
      dignissimos saepe qui consequatur similique a rerum magni voluptates
      doloribus, pariatur officia. Repellat tempora perspiciatis minus
      reprehenderit ex molestiae velit cupiditate distinctio laudantium ducimus.
      Illo perferendis eveniet omnis, sapiente harum eaque sunt facere.
      Deleniti, deserunt dolorum quia accusamus non delectus facere quis, neque
      quasi ratione soluta illum sapiente saepe amet ipsa voluptatibus! Numquam
      deleniti maxime nemo, earum officiis fuga. Ipsam eos commodi ipsum saepe
      ut consectetur in sunt illum rem architecto enim pariatur cumque
      reiciendis praesentium dicta necessitatibus, quis voluptatibus, doloribus
      quae! Reprehenderit quam molestiae rerum sit placeat cumque voluptatum
      iste at, eveniet aspernatur cupiditate quisquam excepturi neque tempora
      dignissimos vero inventore soluta nam suscipit deserunt! Itaque voluptatem
      nesciunt distinctio dolor a eos alias quaerat dolorum vel nam
      necessitatibus fugiat magnam hic maiores, dignissimos tempora facilis
      eveniet nulla exercitationem rem sed. Adipisci ipsa totam repellat cumque
      accusamus tenetur. Quia minus praesentium nam dolorum impedit unde,
      reiciendis tempore, suscipit quas sunt repudiandae quidem distinctio ipsum
      quod consequatur rerum! Quas sed esse beatae suscipit natus nobis aperiam
      ea possimus culpa maxime! Consequuntur sed vel veritatis eveniet, dolore
      molestias nam quidem odio deleniti veniam aut minima neque, dolor in sint
      voluptas cum id placeat! Corrupti, pariatur. Nesciunt sed velit
      dignissimos eveniet explicabo voluptatum ea dolore ducimus laudantium,
      amet vitae magni a blanditiis, voluptas, nobis odit totam alias magnam
      eius architecto assumenda illum porro itaque quos. Ipsam modi quis
      quisquam odit ut, minus ex dolor optio ad tempora nobis voluptatum placeat
      repellat ullam ratione illum itaque dolores consequatur laboriosam eum
      officiis excepturi esse, provident quidem? Ipsam, aliquid velit? Eos
      dignissimos assumenda saepe? Ipsum ipsam nam eveniet, voluptate corrupti
      rem rerum! Distinctio numquam ea, id maxime ab mollitia eum minima
      veritatis temporibus repudiandae! Molestiae nam, labore quisquam pariatur
      praesentium excepturi dignissimos eos architecto, iure aperiam tempore
      blanditiis accusantium cumque qui animi inventore hic fugit reiciendis
      obcaecati atque modi harum maiores. Voluptatibus ex expedita debitis quasi
      quam sed veniam ut incidunt.
    </div>
  );
}
