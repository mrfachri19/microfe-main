// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Label,
  Input,
  Row,
  Col
} from "reactstrap";

const InputFile = () => {
  return (
    // <Card>
    //   <CardBody>
    <Row>
      <Col md="12" sm="12">
        <Input
          type="file"
          id="exampleMultipleFileBrowser"
          name="MultipleFiles"
          multiple
        />
      </Col>
    </Row>
    // </CardBody>
    // </Card>
  );
};
export default InputFile;
