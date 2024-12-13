import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

export const EmailTemplate = ({
  response
}) => {

  return (
    <Html>
      <Head />
      <Preview>Share Next...</Preview>
      <Body style={main}>
        <Container>
          <Section style={content}>
            <Row>
              <Img
                style={image}
                width={620}
                src='https://www.liberty.edu/information-services/wp-content/uploads/File-Sharing-Header.jpg'
              />
            </Row>

            <Row style={{ ...boxInfos, paddingBottom: "0" }}>
              <Column>
                <Heading
                  style={{
                    fontSize: 32,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Hi {response?.emailToSend?.split("@")[0]},
                </Heading>
                <Heading
                  as="h2"
                  style={{
                    fontSize: 26,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {response?.userName} share file with you.
                </Heading>

                <Text style={paragraph}>
                  <b>File Name : </b>
                  {response?.fileName}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>File Size : </b>
                  {(response?.fileSize / (1024 * 1024)).toFixed(2)} MB
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>File Type : </b>
                  {response?.fileType}
                </Text>
                {response?.password && response?.password.length > 3 && (
                  <Text style={{...paragraph, marginTop: -5 }}>
                    <b>Password : </b>
                    {response?.password}
                  </Text>
                )}
                <Text
                  style={{
                    color: "rgb(0,0,0, 0.5)",
                    fontSize: 14,
                    marginTop: -5,
                  }}
                >
                  *Access and download file on your own risk.
                </Text>

                <Text style={paragraph}>
                  Now you can also share file with Share Next App.
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  Click below button to access the file.
                </Text>
              </Column>
            </Row>
            <Row style={{ ...boxInfos, paddingTop: "0" }}>
              <Column style={containerButton} colSpan={2}>
                <Button style={button} href={response?.shortUrl}>Click to download</Button>
              </Column>
            </Row>
          </Section>

          <Section style={containerImageFooter}>
            <Img
              style={image}
              width={620}
              src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnRvcTQyymEOmSCbCKjDIyZO4MasWwO5qmCA&s'
            />
          </Section>

          <Text
            style={{
              textAlign: "center",
              fontSize: 12,
              color: "rgb(0,0,0, 0.7)",
            }}
          >
            © 2024 | Share Next @ 2024 Copyrights U.S.A | https://sahil-1832-portfolio.vercel.app/
          </Text>
        </Container>
      </Body>
    </Html>
  )
};

export default EmailTemplate;

const main = {
  backgroundColor: "#fff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const paragraph = {
  fontSize: 16,
};

const containerButton = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
};

const button = {
  backgroundColor: "#007FFF",
  borderRadius: 3,
  color: "#FFF",
  fontWeight: "bold",
  border: "1px solid rgb(0,0,0, 0.1)",
  cursor: "pointer",
  padding: "12px 30px",
};

const content = {
  border: "1px solid rgb(0,0,0, 0.1)",
  borderRadius: "3px",
  overflow: "hidden",
};

const image = {
  maxWidth: "100%",
};

const boxInfos = {
  padding: "20px",
};

const containerImageFooter = {
  padding: "45px 0 0 0",
};

