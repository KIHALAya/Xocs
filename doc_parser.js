import fm from 'front-matter';

// On github  : https://raw.githubusercontent.com/expo/expo/main/docs/pages/get-started/start-developing.mdx
// parseExpoDocs : This function will fetch the content of the given slug from the expo docs repository and parse it using front-matter.


export const parseExpoDocs = async(slug) => {
    const url = `https://raw.githubusercontent.com/expo/expo/main/docs/pages/${slug}.mdx`;
    const response = await fetch(url);
    const content = await response.text();

    const data = fm(content);

    return data;

};
