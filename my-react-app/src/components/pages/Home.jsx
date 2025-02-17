import React, { useState, useEffect } from "react";

export const Home = () => {
  const [currentDate, setCurrentDate] = useState(""); // current date const
  const [currentTime, setCurrentTime] = useState(""); // current time const

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date(); // get current date and time

      // format the date like "Thursday, Nov 17"
      const formattedDate = now.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
      });

      // format the time in 24 hours and minutes
      const formattedTime = now.toLocaleTimeString("en-UK", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      // update current date and time
      setCurrentDate(formattedDate);
      setCurrentTime(formattedTime);
    };

    updateDateTime(); // set interval to update every minute
    const interval = setInterval(updateDateTime, 60000);

    // clear the interval when updated
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.container}>

      {/* Main Content */}
      <main style={styles.main}>
        {/* Date and Time Header */}
        <div style={styles.header}>
          <h1>{currentDate}</h1>
          <h1>{currentTime}</h1>
        </div>

        {/* Content Box */}
        <div style={styles.contentBox}>
          <h2>Inside the residence</h2>
          <div style={styles.section}>
            <div style={{ ...styles.block, ...styles.firstBlock }}>Block 1</div>
            <div style={styles.block}>Block 2</div>
            <div style={styles.block}>Block 3</div>
            <div style={{ ...styles.block, ...styles.lastBlock }}>Block 4</div>
          </div>
          <div style={styles.paragraphsContainer1}>
            <p style={styles.paragraph}>1</p>
            <p style={styles.paragraph}>2</p>
            <p style={styles.paragraph}>3</p>
            <p style={styles.paragraph}>4</p>
          </div>

          <h2>Outside the residence</h2>
          <div style={styles.section}>
            <div style={{ ...styles.block, ...styles.firstBlock }}>Block 1</div>
            <div style={styles.block}>Block 2</div>
            <div style={styles.block}>Block 3</div>
            <div style={{ ...styles.block, ...styles.lastBlock }}>Block 4</div>
          </div>
          <div style={styles.paragraphsContainer2}>
            <p style={styles.paragraph}>1</p>
            <p style={styles.paragraph}>2</p>
            <p style={styles.paragraph}>3</p>
            <p style={styles.paragraph}>4</p>
          </div>
        </div>

        {/* Energy Bill Section */}
        <div style={styles.energySection}>
          <h2 style={styles.energyTitle}>Energy bill</h2>
          <div style={styles.energyRows}>
            <div style={styles.energyRow}>
              <div style={{ ...styles.block, ...styles.topBlock }}>Block 1</div>
              <div style={{ ...styles.block, ...styles.topBlock }}>Block 2</div>
            </div>
            <div style={styles.energyRow}>
              <div style={{ ...styles.block, ...styles.bottomBlock }}>Block 3</div>
              <div style={{ ...styles.block, ...styles.bottomBlock }}>Block 4</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const styles = {
  container: {
    display: "flex", // Use flexbox to arrange sidebar and main content side by side
    minHeight: "100vh", // Ensure container takes up the full height of the viewport
  },

  main: {
    position: "fixed",
    backgroundColor: "rgba(105, 105, 105, 0.5)", // darker grey with opacity
    borderBottomRightRadius: "25px", // rounded corners bottom right
    borderTopRightRadius: "25px", // rounded corner top right
    padding: "40px", // padding inside the main section
    marginTop: "3vw", // margin to outside main section on top
    marginRight: "3vw", // margin to outside main section on right
    marginLeft: "26vw", // margin to outside main section on left to line up with sidebar
    color: "rgb(255, 255, 255)", // set text colour to white

    borderTop: "2px solid rgba(240, 240, 240, 0.5)", // border on top
    borderBottom: "2px solid rgba(240, 240, 240, 0.5)", // border on bottom
    borderRight: "2px solid rgba(240, 240, 240, 0.5)", // border on right

    width: "71vw",  // width of the main section
    height: "85vh", // height of the main section
  },
  header: {
    display: "flex", // displaye date and time on the same line
    justifyContent: "space-between", // spread out date and time
    marginBottom: "20px", // adds space at the bottom of the header
  },
  contentBox: {
    backgroundColor: "rgba(130, 130, 130, 0.5)", // background colour of the first section
    borderRadius: "25px", // rounded corners
    padding: "20px", // padding inside the section
    outline: "2px solid rgba(210, 210, 210, 0.5)", // outline colour and width
  },
  section: {
    display: "flex", // flexbox to arrange blocks horizontally
    gap: "2px", // gap between the blocks
    marginTop: "20px", // space between blocks and headers
  },
  block: {
    backgroundColor: "rgba(35, 35, 35, 0.5)", // blocks colour and opacity
    width: "25%", // width of each block
    height: "80px", // height of each block
    display: "grid", // enable grid layout
    placeItems: "center", // centres text vertically and horizontally
  },
  firstBlock: {
    borderTopLeftRadius: "10px", // rounded top-left corner of the first block
    borderBottomLeftRadius: "10px", // rounded bottom-left corner of the first block
  },
  lastBlock: {
    borderTopRightRadius: "10px", // rounded top-right corner of the last block
    borderBottomRightRadius: "10px", // rounded bottom-right corner of the last block
  },
  energySection: {
    marginTop: "20px", // space between energy section and previous content
  },
  energyRows: {
    marginTop: "20px", // space between blocks and heading
  },
  energyRow: {
    display: "flex", // flexbox to arrange blocks in a row horizontally
    justifyContent: "space-between", // distribute blocks evenly
    marginBottom: "2px", // space between blocks vertically
  },
  topBlock: {
    borderTopLeftRadius: "10px", // rounded top-left corner of the top blocks
    borderTopRightRadius: "10px", // rounded top-right corner of the top blocks
    width: "48%", // width of the top blocks
    height: "40px", // height of the top blocks
    display: "flex", // enable flex on the container
    justifyContent: "center", // centres content horizontally
    alignItems: "center", // centres content vertically
  },
  bottomBlock: {
    borderBottomLeftRadius: "10px", // rounded bottom-left corner of the bottom blocks
    borderBottomRightRadius: "10px", // rounded bottom-right corner of the bottom blocks
    width: "48%", // width of the bottom blocks
    height: "40px", // height of the bottom blocks
    display: "flex", // enable flex on the container
    justifyContent: "center", // centres content horizontally
    alignItems: "center", // cnetres content vertically
  },
  paragraphsContainer1: {
    display: "flex", // put the paragraphs on the smae line
    justifyContent: "space-between", // evenly distribute the paragraphs
    marginTop: "10px", // space between the paragraphs and the blocks above
    marginBottom: "30px", // space between the paragraphs and the header below
  },
  paragraphsContainer2: {
    display: "flex", // put the paragraphs on the same line
    justifyContent: "space-between", // evenly distribute the paragraphs
    margin: "10px 0", // space between the paragraphs and the blocks above
  },
  paragraph: {
    flexGrow: 1, // give the paragraphs equal space
    textAlign: "center", // centres the text in each paragraph element
  },
  energyTitle: {
    marginLeft: "20px", // indents 'Energy bill' a little
  },
};
