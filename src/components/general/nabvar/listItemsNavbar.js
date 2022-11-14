import { ReactComponent as HomeSVG } from "./../../../icons/home-1.svg";
import { ReactComponent as UploadSVG } from "./../../../icons/simple-play.svg";
import { ReactComponent as ExamsSVG } from "./../../../icons/exams.svg";
import { ReactComponent as CheckSVG } from "./../../../icons/check.svg";
import { ReactComponent as CarruselVideoSVG } from "./../../../icons/carrusel-video.svg";

export const listItemsNavbar = [
  {
    nameItem: "Inicio",
    icon: <HomeSVG />,
    link: "/",
  },
  {
    nameItem: "Subir video ",
    icon: <UploadSVG />,
    link: "/upload-video",
  },
  {
    nameItem: "Redacción de preguntas",
    icon: <ExamsSVG />,
    link: "/write-question",
  },
  {
    nameItem: "Revisión de preguntas",
    icon: <CheckSVG />,
    link: "/check-questions",
  },
  {
    nameItem: "En vivo",
    icon: <CarruselVideoSVG />,
    link: "/lives",
  },
]
