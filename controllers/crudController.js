const Crud = require("../models/Crud");
const mongoose = require("mongoose");

/**
 * GET /
 * Homepage
 */
exports.homepage = async (req, res) => {
  // Remove
  // const messages = await req.consumeFlash('info');
  // Use this instead
  const messages = await req.flash("info");

  const locals = {
    title: "SMB IT A16",
    description: "NodeJS Management CRUD",
  };

  let perPage = 10;
  let page = req.query.page || 1;

  try {
    const crud = await Crud.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
    // Count is deprecated. Use countDocuments({}) or estimatedDocumentCount()
    // const count = await Crud.count();
    const count = await Crud.countDocuments({});

    res.render("index", {
      locals,
      crud,
      current: page,
      pages: Math.ceil(count / perPage),
      messages,
    });
  } catch (error) {
    console.log(error);
  }
};
// exports.homepage = async (req, res) => {
//     const messages = await req.consumeFlash('info');
//     const locals = {
//       title: 'SMB IT A16',
//       description: 'NodeJS Management CRUD'
//     }

//     try {
//       const Crud = await Crud.find({}).limit(22);
//       res.render('index', { locals, messages, Crud } );
//     } catch (error) {
//       console.log(error);
//     }
// }

/**
 * GET /
 * About
 */
exports.about = async (req, res) => {
  const locals = {
    title: "About",
    description: "SMB IT A16 About",
  };

  try {
    res.render("about", locals);
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * New Crud Form
 */
exports.addCrud = async (req, res) => {
  const locals = {
    title: "Add New Crud - NodeJs",
    description: "Add New Crud SMB IT A16",
  };

  res.render("crud/add", locals);
};

/**
 * POST /
 * Create New Crud
 */
exports.postCrud = async (req, res) => {
  console.log(req.body);

  const newCrud = new Crud({
    filesName: req.body.filesName,
    folderName: req.body.folderName,
    details: req.body.details,
    website: req.body.website,
    email: req.body.email,
  });

  try {
    await Crud.create(newCrud);
    await req.flash("info", "New Files has been added.");

    res.redirect("/home");
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * Crud Data
 */
exports.view = async (req, res) => {
  try {
    const crud = await Crud.findOne({ _id: req.params.id });

    const locals = {
      title: "View Crud Data",
      description: "Crud Data",
    };

    res.render("crud/view", {
      locals,
      crud,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * Edit Crud Data
 */
exports.edit = async (req, res) => {
  try {
    const crud = await Crud.findOne({ _id: req.params.id });

    const locals = {
      title: "Edit Crud Data",
      description: "Crud Edit",
    };

    res.render("crud/edit", {
      locals,
      crud,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * Update Crud Data
 */
exports.editPost = async (req, res) => {
  try {
    await Crud.findByIdAndUpdate(req.params.id, {
      filesName: req.body.filesName,
      folderName: req.body.folderName,
      website: req.body.website,
      email: req.body.email,
      details: req.body.details,
      updatedAt: Date.now(),
    });
    await req.flash("info", "File Successfully Updated !");
    await res.redirect(`/home`);

    console.log("redirected");
  } catch (error) {
    console.log(error);
  }
};

/**
 * Delete /
 * Delete Crud Data
 */
exports.deleteCrud = async (req, res) => {
  console.log("delete route", req.params.id);
  try {
    await Crud.deleteOne({ _id: req.params.id });
    // await req.flash("info", "File Deleted !");
    // res.redirect("/home");
    res.json({ success: true, message: "File Deleted" });
  } catch (error) {
    console.log(error);
  }
};

/**
 * Get /
 * Search Crud Data
 */
exports.searchCruds = async (req, res) => {
  const locals = {
    title: "Search Crud Data",
    description: "Crud Search",
  };

  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const cruds = await Crud.find({
      $or: [
        { filesName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { folderName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });

    res.render("search", {
      cruds,
      locals,
    });
  } catch (error) {
    console.log(error);
  }
};
