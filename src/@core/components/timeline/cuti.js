// ** Third Party Components
import Proptypes from 'prop-types'
import classnames from 'classnames'
import Avatar from "@components/avatar";
import { Send16Filled, CalendarCancel16Filled, CheckmarkCircle20Filled, DismissCircle20Filled } from "@fluentui/react-icons";
import { Input } from 'reactstrap'
import moment from "moment";

const TimelineCuti = props => {
  // ** Props
  const { data, tag, className } = props

  // ** Custom Tagg
  const Tag = tag ? tag : 'ul'

  return (
    <Tag
      className={classnames('timeline', {
        [className]: className
      })}
    >
      {data.map((item, i) => {
        const ItemTag = item.tag ? item.tag : 'li'

        return (
          <ItemTag
            key={i}
            className={classnames('timeline-item', {
              [item.className]: className
            })}
          >
            <span
              className={classnames('timeline-point', {
                [`timeline-point-tertiary`]: "tertiary",
                'timeline-point-indicator': !item.icon
              })}
            >
              {/* {item.icon ? item.icon : null} */}
              {item.status === "submit"
                ? <Send16Filled color="white" /> : item.status === "approve"
                  ? <CheckmarkCircle20Filled color="#fff" /> : item.status === "reject"
                    ? <DismissCircle20Filled color="#fff" /> : item.state_status === 3
                      ? <Send16Filled color="white" /> : item.state_status === 4
                        ? <Send16Filled color="white" /> : <CalendarCancel16Filled color="#fff" />}
            </span>
            <div className='timeline-event'>
              <div
                className={classnames('d-flex justify-content-between flex-sm-row flex-column', {
                  'mb-sm-0 mb-1': item.create_date
                })}
              >
                <h6 className={`${item.status === "submit"
                  ? "text-warning" : item.status === "approve"
                    ? "text-primary" : item.status === "reject"
                      ? "text-danger" : item.state_status === 3
                        ? "text-warning" : item.state_status === 4
                          ? "text-warning" : "text-tertiary"}`}>{item.status_text}</h6>
                {item.create_date ? (
                  <span
                    className={classnames('timeline-event-time', {
                      [`me-1`]: `me-1`
                    })}
                  >
                    {moment(item.create_date).format("DD MMMM YYYY")} | {item.create_time}
                  </span>
                ) : null}
              </div>
              <p
                className={classnames({
                  'mb-0': i === data.length - 1 && !item.customContent
                })}
              >
                {item.content}
              </p>
              {/* {item.customContent ? item.customContent : null} */}
              <div className={`d-flex`}>
                <div className={`bg-white`}
                  style={{ width: "40px", height: "40px", borderRadius: "9999px" }}>
                  <Avatar
                    className="photo-karyawan"
                    img={item.foto}
                    imgHeight="40"
                    imgWidth="40"
                  />
                </div>
                <div className='ms-50'>
                  <div className='mb-0 fs-4'>{item.nama} - {item.nik}</div>
                  <small>{item.posisi}</small>
                  <div className={`d-flex flex-row w-100 mt-5`}>
                    <Input type='text' name='commentJustification' id='commentJustification' defaultValue={item.komentar}
                      placeholder="commentJustification"
                      disabled />
                  </div>
                </div>
              </div>
            </div>
          </ItemTag>
        )
      })}
    </Tag>
  )
}

export default TimelineCuti

// ** PropTypes
TimelineCuti.propTypes = {
  tag: Proptypes.string,
  className: Proptypes.string,
  data: Proptypes.array.isRequired
}
