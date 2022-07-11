"use strict";

const HTML_CONTENT = null || document.getElementById("content");
const API = "https://youtube-v31.p.rapidapi.com/playlistItems?playlistId=PLSEoGpRPA4UhycGXWKb-4RRdbNLJsYphG&part=snippet&maxResults=50";
const DEFAULT_OPTIONS = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": "ac12eb66e2msh3f0a8cd19b28c17p16d614jsna25bb004d07f",
		"X-RapidAPI-Host": "youtube-v31.p.rapidapi.com"
	}
};

async function fetchData(apiUrl, requestOptions) {
	const response = await fetch(apiUrl, requestOptions);
	const data = response.json();
	return data;
}

async function getVideosFromPlaylist() {
	try {
		const playlistFullObject = await fetchData(API, DEFAULT_OPTIONS);
		const videos = playlistFullObject.items;
		
		const videosAsHtml = videos.map( video => `
			<div class="group relative">
			  <div
				class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
				<img src="${video.snippet.thumbnails.high.url}" alt="" class="w-full">
			  </div>
			  <div class="mt-4 flex justify-between">
				<h3 class="text-sm text-gray-700">
				  <span aria-hidden="true" class="absolute inset-0"></span>
				  ${video.snippet.title}
				</h3>
			  </div>
			</div>`
		).join("");
		
		HTML_CONTENT.innerHTML = videosAsHtml;
		
		
	} catch (error) {
		console.error(error);
		alert("Ocurrió un error 😔.");
	}
}

getVideosFromPlaylist();