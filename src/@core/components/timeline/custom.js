// ** Third Party Components
import Proptypes from 'prop-types'
import classnames from 'classnames'
import Avatar from "@components/avatar";
import { Send16Filled, CalendarCancel16Filled, CheckmarkCircle20Filled, DismissCircle20Filled } from "@fluentui/react-icons";
import { Input } from 'reactstrap'

const TimelineCustom = props => {
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
              {item.state_status === 0
                ? <Send16Filled color="white" /> : item.state_status === 1
                  ? <CheckmarkCircle20Filled color="#fff" /> : item.state_status === 2
                    ? <DismissCircle20Filled color="#fff" /> : item.state_status === 3
                      ? <Send16Filled color="white" /> : item.state_status === 4
                        ? <Send16Filled color="white" /> : <CalendarCancel16Filled color="#fff" />}
            </span>
            <div className='timeline-event'>
              <div
                className={classnames('d-flex justify-content-between flex-sm-row flex-column', {
                  'mb-sm-0 mb-1': item.date
                })}
              >
                <h6 className={`${item.state_status === 0
                  ? "text-warning" : item.state_status === 1
                    ? "text-primary" : item.state_status === 2
                      ? "text-danger" : item.state_status === 3
                        ? "text-warning" : item.state_status === 4
                          ? "text-warning" : "text-tertiary"}`}>{item.state}</h6>
                {item.date ? (
                  <span
                    className={classnames('timeline-event-time', {
                      [`me-1`]: `me-1`
                    })}
                  >
                    {item.date} | {item.time}
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
              <div className={`d-flex ${item.state_status === 1 ? "" : item.state_status === 2 ? "" : "align-items-center"}`}>
                <div className={`bg-white`}
                  style={{ width: "40px", height: "40px", borderRadius: "9999px" }}>
                  <Avatar
                    className="photo-karyawan"
                    img={item.photo}
                    imgHeight="40"
                    imgWidth="40"
                  />
                </div>
                <div className='ms-50'>
                  <div className='mb-0 fs-4'>{item.name} - {item.nik}</div>
                  <small>{item.position}</small>
                  <div className={`d-flex flex-row w-100 mt-5 ${item.state_status === 1 ? "" : item.state_status === 2 ? "" : "d-none"}`}>
                    <Input type='text' name='commentJustification' id='commentJustification' defaultValue={item.comment}
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

export default TimelineCustom

// ** PropTypes
TimelineCustom.propTypes = {
  tag: Proptypes.string,
  className: Proptypes.string,
  data: Proptypes.array.isRequired
}
