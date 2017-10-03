class DropBotUI extends UIPlugin {
  constructor(elem, focusTracker){
    super(elem, focusTracker, "Experiment Controller");
    this.model = new Backbone.Model();
    this.listen();
  }
  listen() {
    this.model.on("all", this.render.bind(this));
    this.onStateMsg("dropbot_plugin", "stats", this.onStatsSet.bind(this));
    this.onStateMsg("dropbot_plugin", "frequency", this.onFrequencySet.bind(this));
    this.onStateMsg("dropbot_plugin", "voltage", this.onVoltageSet.bind(this));
  }
  onStatsSet(payload) {this.model.set("stats", JSON.parse(payload));}
  onFrequencySet(payload) {this.model.set("frequency", JSON.parse(payload));}
  onVoltageSet(payload){this.model.set("voltage", JSON.parse(payload));}
  render() {
    console.log("rendering...");

    this.element.innerHTML = `
      <ul class="list-group">
        <li class="list-group-item">
          <b>Stats</b>: ${this.model.get("stats")}
        </li>
        <li class="list-group-item">
          <b>Voltage</b>: ${this.model.get("voltage")}
        </li>
        <li class="list-group-item">
          <b>Frequency</b>: ${this.model.get("frequency")}
        </li>
      </ul>
    `;
  }
}
window.microdropPlugins.set("DropBotUI", DropBotUI);
