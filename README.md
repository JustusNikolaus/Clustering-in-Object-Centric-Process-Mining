# Clustering in Object Centric Process Mining
This is the Repository of team #5 of the SoftwareProjektPraktikum.
This project is developed during WiSe 21/22 by 5 RWTH Aachen University students.

## Requirements Overview
* Requires Python, pip and Graphviz.
* Requires Docker for the creation of a container, which may be downloaded here: https://docs.docker.com/docker-for-windows/install/.

## Initialisation
* Firstly, clone the project from https://github.com/Justus-Nitroklaus/Clustering-in-Object-Centric-Process-Mining.git.
* After cloning to your local, run the command `pip install -r requirements.txt` to download all requirements.

## Running without a Container
* Run the command `python manage.py runserver` in the project directory in order to run the development server at `http://127.0.0.1:8000/`.
* Type `http://127.0.0.1:8000/` into your browser and you should be able to run the project.

## Creating and Running a Docker Container
* Run the command `docker build . -t [image_name]` with `[image_name]` being whatever name you want to give the image. For example: `docker build . -t ciocel_one`. This should build a Docker image with the passed name.
* Run the Docker container that you have created using the command `docker run -d -p 8000:8000 [image_name]`, while replacing `[image_name]` with the name you have previously given the image. That should run the container in detached mode and port it to your local host; `http://127.0.0.1:8000/`.
* Type `http://127.0.0.1:8000/` into your browser and you should be able to run the project.
