import {
  Project as ProjectWrapper,
  ProjectTitle,
  ProjectStack,
  ProjectStackTech,
  ProjectLink,
  ProjectLinks,
  FigureProjects,
  ImageProjects,
} from "./style";

import { Text } from "@/styles/Text";
import { useEffect, useState } from "react";
import { FaGithub, FaShare } from "react-icons/fa";
import { userData } from "@/utils/userData";

interface ReposType {
  id: number;
  name: string;
  language: string;
  description: string;
  html_url: string;
  homepage: string;
  topics: Array<string>
}

export const Project = (): JSX.Element => {
  const [repositories, setRepositories] = useState<ReposType[]>([]);
  const [images, setImages] = useState<any>([])

  useEffect(() => {
    const fetchData = async () => {
      const repos = await fetch(`https://api.github.com/users/${userData.githubUser}/repos`)
      const reposJson = await repos.json()
      setRepositories(reposJson)

      const repoImage = reposJson.map(async (elem: any) => {
        const image = await fetch(`https://api.github.com/repos/emergs/${elem.name}/contents/src/assets/main.png`)
        if (image.ok) {
          const img = await image.json()
          return img
        }
        return null
      })

      const imageResult = await Promise.all(repoImage)
      setImages(imageResult.filter((img) => img !== null))
      // fetch(`https://api.github.com/users/${userData.githubUser}/repos`)
      //   .then(res => res.json())
      //   .then((res) => setRepositories(res))
      //   .then(() => {
      //     repositories?.map((elem) => {
      //       //console.log(elem.name)
      //       fetch(`https://api.github.com/repos/emergs/${elem.name}/contents/src/assets/main.png`)
      //         .then(res => res.json())
      //         .then((res) => {
      //           if (res) {
      //             setImages(res)
      //           }
      //         })
      //         .catch(err => console.log(err))

      //     })
      //   })
    };

    fetchData();
  }, []);

  console.log(repositories);


  return (
    <>
      {repositories &&
        repositories?.map?.((repository) => (
          repository.topics[0] === 'favorite' ?
            < ProjectWrapper key={repository.id} >
              <ProjectTitle
                as="h2"
                type="heading3"
                css={{ marginBottom: "$3" }}
                color="grey4"
              >
                {repository.name}
              </ProjectTitle>

              <ProjectStack>
                <Text type="body2" color="grey2">
                  Linguagem principal:
                </Text>
                {repository.language ? (
                  <ProjectStackTech>
                    <Text color="grey2" type="body2">
                      {repository.language}
                    </Text>
                  </ProjectStackTech>
                ) : (
                  <ProjectStackTech>
                    <Text color="grey2" type="body2">
                      Primary language not identified
                    </Text>
                  </ProjectStackTech>
                )}
              </ProjectStack>

              {/* <Text type="body1" color="grey2">
                {repository.description?.substring(0, 129)}
              </Text> */}
              <ProjectLinks>
                <ProjectLink target="_blank" href={repository.html_url}>
                  <FaGithub /> Github Code
                </ProjectLink>
                {repository.homepage && (
                  <ProjectLink
                    target="_blank"
                    href={`${repository.homepage}`}
                  >
                    <FaShare /> Ir para o site
                  </ProjectLink>
                )}
              </ProjectLinks>
              <FigureProjects>
                {/* <ImageProjects src={ } alt="imagem" /> */}
              </FigureProjects>
            </ProjectWrapper >
            :
            null
        ))}
    </>
  );
};
