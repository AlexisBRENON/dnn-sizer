class Layer {
  constructor() {
    this.layerTypeName = "Unknown";
    this.layerTypeId = this.layerTypeName;
  }

  toString() {
    var result = `
    <div class='layerType${this.layerTypeId}'>
      <div class="layerType">
        <select onChange="changeLayerType(this)">
        <option value="Unknown">Unknown</option>
        <option value="FullyConnectedLayer">Fully Connected</option>
        </select>
      </div>
    </div>
    `;
    return result;
  }
}

class FullyConnectedLayer extends Layer {
  constructor() {
    super()
    this.layerTypeName = "Fully Connected"
    this.layerTypeId = "FullyConnected"
    this.layerWidth = 512
    this.maxWidth = 2048
  }

  toString() {
    return `
    <div class='layerType${this.layerTypeId}'>
      <div class="layerType">
        <select onChange="changeLayerType(this)">
        <option value="Unknown">Unknown</option>
        <option value="FullyConnectedLayer">Fully Connected</option>
        </select>
      </div>
      <div class="layerSize">
        <input type="range" value="${this.layerWidth}" min="0" max="${this.maxWidth}" step="1"></input>
      </div>
      <div class="layerLimits">
        <input type="number" min="0" value="${this.maxWidth}" step="1"></input>
      </div>
    </div>
    `
  }
}

var Layers = {
  Unknown: Layer,
  FullyConnectedLayer: FullyConnectedLayer,
};

function addLayer() {
  var newLayer = $('<div class="layer"></div>');
  $(new Layer().toString()).appendTo(newLayer);
  newLayer.appendTo("#hiddenLayers");
}

function changeLayerType(e) {
  var newType = e.value;
  var layerContainer = $(e).parents('.layer');
  layerContainer.empty();
  var layer = $(new Layers[newType]().toString());
  layer.find("select")[0].value = newType;
  layer.appendTo(layerContainer);
}
