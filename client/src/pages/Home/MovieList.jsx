import React from "react";
import { useState, useEffect } from "react";
import { Button, Table, message } from "antd";
import { hideLoading, showLoading } from "../../redux/loaderSlice";
import { getAllMovies } from "../../api/movie";
import { useDispatch } from "react-redux";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import MovieForm from "./MovieForm";
import DeleteMovieModal from "./DeleteMovieModal";

export default function MovieList() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [formType, setFormType] = useState("add");
  const [movies, setMovies] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  const getData = async () => {
    dispatch(showLoading());
    const response = await getAllMovies();
    const allMovies = response.data;
    setMovies(
      allMovies.map(function (item) {
        return { ...item, key: `movie_${item._id}` };
      })
    );
    dispatch(hideLoading());
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      title: "Poster",
      dataIndex: "poster",
      render: (url) => <img src={url} alt="poster" width={50} />,
    },
    {
      title: "Movie Name",
      dataIndex: "title",
    },
    {
      title: "Movie/TV Show",
      dataIndex: "type",
      width: 300,
    },
    {
      title: "Director",
      dataIndex: "director",
    },
    {
      title: "Budget",
      dataIndex: "budget",
    },
    {
      title: "Location",
      dataIndex: "location",
    },
    {
      dataIndex: "duration",
      render: (value) => {
        return `${value} mins`;
      },
    },
    {
      title: "Release Year",
      dataIndex: "year",
    },
    {
      title: "Action",
      render: (value, data) => {
        return (
          <div style={{ display: "flex", gap: "4px" }}>
            <Button
              onClick={() => {
                setIsModalOpen(true);
                setFormType("edit");
                setSelectedMovie(data);
              }}
            >
              <EditOutlined />
            </Button>
            <Button
              onClick={() => {
                setIsDeleteModalOpen(true);
                setSelectedMovie(data);
              }}
            >
              <DeleteOutlined />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      {contextHolder}
      <div className="d-flex justify-content-end mb-10px">
        <Button
          onClick={() => {
            setIsModalOpen(true);
            setFormType("add");
          }}
        >
          Add Movie
        </Button>
      </div>
      <Table
        dataSource={movies}
        columns={columns}
        pagination={{ pageSize: 5 }}
      />
      {isModalOpen && (
        <MovieForm
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          selectedMovie={selectedMovie}
          formType={formType}
          setSelectedMovie={setSelectedMovie}
          getData={getData}
          messageApi={messageApi}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteMovieModal
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
          getData={getData}
          messageApi={messageApi}
        />
      )}
    </div>
  );
}
