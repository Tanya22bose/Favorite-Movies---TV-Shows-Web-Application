import { Col, Modal, Row, Form, Input, Select, Button } from "antd";
import { showLoading, hideLoading } from "../../redux/loaderSlice";
import { useDispatch } from "react-redux";
import { addMovie, updateMovie } from "../../api/movie";
import React from "react";

const MovieForm = ({
  isModalOpen,
  setIsModalOpen,
  selectedMovie,
  setSelectedMovie,
  formType,
  getData,
  messageApi,
}) => {
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      let response = null;
      if (formType === "add") {
        console.log(values);
        response = await addMovie(values);
      } else {
        response = await updateMovie(selectedMovie._id, values);
      }
      if (response.success) {
        getData();
        messageApi.open({
          type: "success",
          content: response.message,
        });
        setIsModalOpen(false);
      } else {
        messageApi.open({
          type: "error",
          content: response.message,
        });
      }
      setSelectedMovie(null);
      dispatch(hideLoading());
    } catch (err) {
      dispatch(hideLoading());
      messageApi.open({
        type: "error",
        content: response.message,
      });
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    <Modal
      centered
      title={formType === "add" ? "Add Movie" : "Edit Movie"}
      open={isModalOpen}
      onCancel={handleCancel}
      width={800}
      footer={null}
    >
      <Form layout="vertical" initialValues={selectedMovie} onFinish={onFinish}>
        <Row gutter={{ xs: 6, sm: 10, md: 12, lg: 16 }}>
          <Col span={24}>
            <Form.Item
              label="Movie Name"
              name="title"
              rules={[{ required: true, message: "Movie name is required!" }]}
            >
              <Input placeholder="Enter the movie name" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Director"
              name="director"
              rules={[
                { required: true, message: "director name is required!" },
              ]}
            >
              <Input placeholder="Enter director's name" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Row gutter={{ xs: 6, sm: 10, md: 12, lg: 16 }}>
              <Col span={12}>
                <Form.Item
                  label="Duration (in mins)"
                  name="duration"
                  rules={[
                    { required: true, message: "Movie duration is required!" },
                  ]}
                >
                  <Input
                    type="number"
                    placeholder="Enter movie duration in mins"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Type of Show"
                  name="type"
                  rules={[
                    { required: true, message: "Movie location is required!" },
                  ]}
                >
                  <Select
                    placeholder="Select Type of Show"
                    options={[
                      { value: "Movie", label: "Movie" },
                      { value: "TV Show", label: "TV Show" },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Release Year"
                  name="year"
                  rules={[
                    {
                      required: true,
                      message: "Movie Release Year is required!",
                    },
                  ]}
                >
                  <Input
                    type="number"
                    placeholder="Enter Movie's Release Year"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Location"
                  name="location"
                  rules={[
                    {
                      required: true,
                      message: "Movie Location is required!",
                    },
                  ]}
                >
                  <Input placeholder="Enter Location" />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row gutter={{ xs: 6, sm: 10, md: 12, lg: 16 }}>
              <Col span={8}>
                <Form.Item
                  label="Budget"
                  name="budget"
                  rules={[
                    { required: true, message: "Movie budget is required!" },
                  ]}
                >
                  <Input type="number" placeholder="Enter Movie's Budget" />
                </Form.Item>
              </Col>
              <Col span={16}>
                <Form.Item
                  label="Poster URL"
                  name="poster"
                  rules={[
                    { required: true, message: "Movie Poster is required!" },
                  ]}
                >
                  <Input placeholder="Enter the poster URL" />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
        <Form.Item>
          <Button
            block
            type="primary"
            htmlType="submit"
            style={{ fontSize: "1rem", fontWeight: "600" }}
          >
            Submit the Data
          </Button>
          <Button className="mt-3" block onClick={handleCancel}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default MovieForm;
