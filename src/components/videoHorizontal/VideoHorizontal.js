import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { AiFillEye } from "react-icons/ai";
// import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import moment from "moment";
import numeral from "numeral";

// import { getChannelDetails } from '../../redux/actions/channel.action'
import "./videoHorizontal.scss";
import request from "../../api";
import { useSelector } from "react-redux";

//rename to card
const VideoHorizontal = ({
  video,
  showChannel = true,
  showDescription = true,
  channelScreen,
}) => {
  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      description,
      title,
      publishedAt,
      thumbnails: { medium },
      resourceId,
    },
  } = video;

  const accessToken = useSelector((state) => state.auth.accessToken);

  const thumbnail =
    id.kind === "youtube#channel" || channelScreen
      ? "videoHorizon__thumbnail-channel"
      : "videoHorizon__thumbnail-video";

  const history = useHistory();

  const [channelIcon, setChannelIcon] = useState(null);

  const [duration, setDuration] = useState(null);
  const [views, setViews] = useState(null);

  const handleClick = () => {
    if (id.kind === "youtube#channel" || channelScreen)
      history.push(`/channel/${resourceId.channelId}`);
    else history.push(`/watch/${id.videoId}`);
  };

  useEffect(() => {
    const get_channel_thumbnail = async () => {
      const {
        data: { items },
      } = await request("/channels", {
        params: {
          part: "snippet",
          id: channelId,
        },
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setChannelIcon(items[0].snippet.thumbnails.default);
    };
    if (showChannel) get_channel_thumbnail();
  }, [showChannel, channelId, accessToken]);

  useEffect(() => {
    const get_video_details = async () => {
      const {
        data: { items },
      } = await request("/videos", {
        params: {
          part: "contentDetails,statistics",
          id: id.videoId,
        },
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setViews(items[0].statistics.viewCount);
      setDuration(items[0].contentDetails.duration);
    };
    if (!channelScreen && id.kind !== "youtube#channel") {
      get_video_details();
    }
  }, [id, channelScreen, accessToken]);

  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");

  return (
    <Row className="videoHorizon" onClick={handleClick}>
      <Col xs={6} md={showDescription ? 4 : 6} className="videoHorizon__left">
        <img
          src={medium.url}
          alt=""
          className={`videoHorizon__thumbnail ${thumbnail}`}
        />
        {_duration !== "00:00" && (
          <span className="videoHorizon__duration">{_duration}</span>
        )}
      </Col>

      <Col xs={6} md={showDescription ? 8 : 6} className="videoHorizon__right">
        <p className="videoHorizon__title">{title}</p>

        {!channelScreen && (
          <div className="videoHorizon__metadata">
            {views && (
              <span>
                <AiFillEye /> {numeral(views).format("0.a")} views •{" "}
              </span>
            )}
            <span>{moment(publishedAt).fromNow()}</span>
          </div>
        )}

        {id.kind !== "youtube#channel" && !channelScreen && (
          <div className="videoHorizon__channel">
            <img
              src={channelIcon && channelIcon.url}
              alt=""
              className="videoHorizon__channel-icon"
            />
            <p className="videoHorizon__channel-name">{channelTitle}</p>
          </div>
        )}

        {showDescription && (
          <p className="videoHorizon__desc">{description} </p>
        )}

        {channelScreen && (
          <p className="mt-2">{video.contentDetails.totalItemCount} videos</p>
        )}
      </Col>
    </Row>
  );
};

export default VideoHorizontal;
