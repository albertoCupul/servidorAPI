const SchemaProducto = require('./models/product/main');
const SchemaDetail = require('./models/product/detail');
const SchemaCategoria = require('../../categoryComplement/mongooseDB/models/category/main');

async function newProdDetail(info, idAdded) {
  try {
    const Detalle = new SchemaDetail();
    Detalle.descripcion = info.descripcion;
    /* inyectando atributos */
    info.atributos.map((item) => {
      Detalle.atributos.push({
        nombre: item.nombre,
        valor: item.valor,
      });
      return true;
    });
    Detalle.dimensiones.alto = info.dimensiones.alto;
    Detalle.dimensiones.ancho = info.dimensiones.ancho;
    Detalle.dimensiones.profundo = info.dimensiones.profundo;
    // console.log(Detalle);
    Detalle.idProdMain = idAdded;
    Detalle.save();
    return true;
  } catch (e) {
    console.error(e.message);
    return false;
  }
}

async function newProdMain(info) {
  try {
    const Producto = new SchemaProducto();
    const Categoria = new SchemaCategoria();
    let filter = { titulo: info.titulo };
    let resp = await Producto.findOne(filter);
    const bandRoot = { recibido: true, existe: false };
    const bandChild = { recibido: false, existe: false };
    const bandSubChild = { recibido: false, existe: false };
    /* si no existe el producto con el nombre */
    if (!resp) {
      Producto.titulo = info.titulo;
      Producto.precio.iva = info.precio.iva;
      Producto.precio.costo = info.precio.costo;
      Producto.precio.venta = info.precio.venta;
      Producto.inventario.administrar = info.inventario.administrar;
      Producto.inventario.existencias = info.inventario.existencias;
      Producto.inventario.minimo = info.inventario.minimo;
      /* validando que existe el padre */
      const idRoot = info.categoria.root;
      filter = { _id: idRoot };
      resp = await Categoria.findRoot(filter);
      if (resp) {
        bandRoot.existe = true;
        Producto.categoria.root = idRoot;
        /* validando si mandaron un child */
        if (info.categoria.child !== '' && info.categoria.child !== null) {
          bandChild.recibido = true;
          const idChild = info.categoria.child;
          /* validando que existe el child */
          resp = resp.child.id(idChild);
          if (resp) {
            bandChild.existe = true;
            Producto.categoria.child = idChild;
            /* validando si mandó subChild */
            if (info.categoria.subChild !== '' && info.categoria.subChild !== null) {
              bandSubChild.recibido = true;
              /* validando que existe la subChild */
              const idSubChild = info.categoria.subChild;
              resp = resp.child.id(idSubChild);
              if (resp) {
                bandSubChild.existe = true;
                Producto.categoria.subChild = idSubChild;
              } else {
                /* return porque no existe el Subchild */
                return 5;
                // return JSON.stringify({
                //   status: 404,
                //   message: 'Invalid Id Subchild',
                //   idMessage: 9003,
                //   module: 'category managment',
                //   detail: info,
                // });
              }
            }
          } else {
            /* return porque no existe el child */
            return 4;
            // return JSON.stringify({
            //   status: 404,
            //   message: 'Invalid Id Child',
            //   idMessage: 9004,
            //   module: 'category managment',
            //   detail: info,
            // });
          }
        }
      } else {
        /* return porque no existe el root */
        return 3;
        // return JSON.stringify({
        //   status: 404,
        //   message: 'Invalid Id Root',
        //   idMessage: 9005,
        //   module: 'category managment',
        //   detail: info,
        // });
      }
    } else {
      /* sino se debe guardar, es porque ya existe */
      return 2;
      // return JSON.stringify({
      //   status: 400,
      //   message: 'Product already exist',
      //   idMessage: 9002,
      //   module: 'category managment',
      // });
    }
    // console.log(bandRoot);
    // console.log(bandChild);
    // console.log(bandSubChild);
    /* preguntando si se debe salvar el producto */
    if (bandRoot.recibido === bandRoot.existe
      && bandChild.recibido === bandChild.existe
      && bandSubChild.recibido === bandSubChild.existe) {
      let id = await Producto.save(info);
      id = id._id;
      /* const respDetail = await newProdDetail(info, idAdded); */
      /* retorno de guardado completo */
      return id;
      // return JSON.stringify({
      //   status: 400,
      //   message: 'Product saved succesfull',
      //   idMessage: 9000,
      //   module: 'category managment',
      // });
    }
    /* sino se debe guardar, es porque hay un error en algun id
    root, child, subchild */
    return 1;
    // return JSON.stringify({
    //   status: 404,
    //   message: 'ID Error with root, child or subchild',
    //   idMessage: 9001,
    //   module: 'category managment',
    // });
  } catch (e) {
    console.error(e.message);
    return 0;
    // return JSON.stringify({
    //   status: 500,
    //   message: 'Internal Server Error',
    //   idMessage: 9505,
    //   module: 'category managment',
    //   detail: e.message,
    // });
  }
}

async function addProduct(infoAdmin) {
  try {
    /* creando copia independiente de los enviados */
    const producto = { ...infoAdmin.product };
    const resp = await newProdMain(producto);
    switch (resp) {
      case 0:
        return JSON.stringify({
          status: 500,
          message: 'Internal Server Error',
          idMessage: 9505,
          module: 'category managment',
        });
      case 1:
        return JSON.stringify({
          status: 404,
          message: 'ID Error with root, child or subchild',
          idMessage: 9001,
          module: 'category managment',
        });
      case 2:
        return JSON.stringify({
          status: 400,
          message: 'Product already exist',
          idMessage: 9002,
          module: 'category managment',
        });
      case 3:
        return JSON.stringify({
          status: 404,
          message: 'Invalid Id Root',
          idMessage: 9005,
          module: 'category managment',
        });
      case 4:
        return JSON.stringify({
          status: 404,
          message: 'Invalid Id Child',
          idMessage: 9004,
          module: 'category managment',
        });
      case 5:
        return JSON.stringify({
          status: 404,
          message: 'Invalid Id Subchild',
          idMessage: 9003,
          module: 'category managment',
        });
      default:
        break;
    }
    /* agregando el detallado */
    const respDetail = await newProdDetail(producto, resp);
    /* validando si se agregó correctamente */
    if (respDetail) {
      const Main = new SchemaProducto();
      const Detalle = new SchemaDetail();
      const perfil = await Main.findAllPerfil(resp);
      console.log(perfil);
    }
    return JSON.stringify({
      status: 201,
      message: 'Product saved succesfull',
      idMessage: 9000,
      module: 'category managment',
    });
  } catch (e) {
    /* console.log(e.message); */
    return JSON.stringify({
      status: 500,
      message: 'Internal Server Error',
      idMessage: 9503,
      module: 'category managment',
    });
  }
}

module.exports.addProduct = addProduct;
