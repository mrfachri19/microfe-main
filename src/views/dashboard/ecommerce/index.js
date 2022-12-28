// ** React Imports
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

// ** Reactstrap Imports
import { Row, Col, Breadcrumb } from "reactstrap";

// ** Context
import { ThemeColors } from "@src/utility/context/ThemeColors";

// ** Demo Components
import CardCarousel from "../../components/cards/corousel";
import CardPresensi from "../../components/cards/presensi/CardPresensi";
import CardOKR from "../../components/cards/okr";
import CardMeetup from "../../components/cards/event";
import CardSaranPintar from "../../components/cards/saranPintar";
import CardTimeline from "../../components/cards/timeline";

// ** Styles
import "@styles/react/libs/charts/apex-charts.scss";
import "@styles/base/pages/dashboard-ecommerce.scss";
import CardMyTeam from "../../components/cards/myTeam";
import CardTugasSaya from "../../components/cards/tugasSaya";

import { toggelRatingModal } from '../../../redux/modalToggle';
import RatingModal from "../../components/Modals/RatingModal";

const EcommerceDashboard = () => {
  // ** Context
  const modals = useSelector((state) => state.modal.isRatingModal);
  const dispatch = useDispatch();
   // console.log("rating Modal",modals);
  dispatch(toggelRatingModal(modals));
  const { colors } = useContext(ThemeColors);

  return (
    <div id="dashboard-ecommerce">
      <Row className="match-height">
        <Col xl={{ size: 4, order: 1 }} md={{ size: 6, order: 2 }} xs={{ size: 12, order: 1 }}>
          <CardCarousel />
        </Col>
        <Col xl={{ size: 4, order: 2 }} md={{ size: 12, order: 1 }} xs={{ size: 12, order: 2 }}>
          <CardPresensi />
        </Col>
        <Col xl={{ size: 4, order: 3 }} md={{ size: 6, order: 3 }} xs={{ size: 12, order: 3 }}>
          <CardSaranPintar />
        </Col>
      </Row>
      <Row className="match-height">
        <Col xl={{ size: 4, order: 1 }} md={{ size: 12, order: 1 }} xs={{ size: 12, order: 1 }}>
          <CardMyTeam />
        </Col>
        <Col xl={{ size: 4, order: 2 }} md={{ size: 12, order: 2 }} xs={{ size: 12, order: 2 }}>
          <CardTugasSaya success={colors.success.main} />
        </Col>
        <Col xl={{ size: 4, order: 3 }} md={{ size: 12, order: 3 }} xs={{ size: 12, order: 3 }}>
          <CardMeetup />
        </Col>
      </Row>
      <Row className="match-height">
        <Col xl={{ size: 6, order: 1 }} md={{ size: 12, order: 1 }} xs={{ size: 12, order: 1 }}>
          <CardOKR />
        </Col>
        <Col xl={{ size: 6, order: 1 }} md={{ size: 12, order: 2 }} xs={{ size: 12, order: 2 }}>
          <CardTimeline/>
        </Col>
      </Row>
    {/* <RatingModal /> */}
    </div>
  );
};

export default EcommerceDashboard;
