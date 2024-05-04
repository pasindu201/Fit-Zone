import "./Supplement.scss";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SupplementComments from "../supplementComment/SupplementComment";
import { useState } from "react";
import { ShoppingCart } from "@mui/icons-material";

const Supplement = ({ supplement, userName }) => {
  const [commentOpen, setCommentOpen] = useState(false);

  console.log(userName);

  return (
    <div className="supplement">
      <div className="container">
        <h1 className="name">{supplement.name}</h1>
        <MoreHorizIcon />
      </div>
      <div className="content">
        <img src={`data:image/jpeg;base64,${supplement.image}`} alt="Profile" />
        <p>{supplement.description}</p>
      </div>
      <h2>Price : {supplement.price}</h2>
      <div className="content2">
        <div className="sub-topic">
          <span>Ingredients</span>
          <hr />
        </div>
        <p>{supplement.ingredients}</p>
        <div className="sub-topic">
          <span>Brand Details</span>
          <hr />
        </div>
        <p>{supplement.brandDetails}</p>
        <div className="sub-topic">
          <span>Manufacturer Details</span>
          <hr />
        </div>
        <p>{supplement.manufacturer}</p>
        <div className="sub-topic">
          <span>How to Use </span>
          <hr />
        </div>
        <p>{supplement.howtoUse}</p>
        <div className="sub-topic">
          <span>Available flavors</span>
          <hr />
        </div>
        <p>{supplement.flavors}</p>
      </div>
      <div className="info">
        <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
          <TextsmsOutlinedIcon />
          <p>{supplement.comments}</p>
        </div>
        <div className="item">
          <ShoppingCart />
          Add To Cart
        </div>
      </div>
      <hr className="bottom-line" />
      <div className="comments">
        {commentOpen && <SupplementComments postId={supplement.id} commenterName={userName} />}
      </div>
    </div >
  );
};

export default Supplement;
