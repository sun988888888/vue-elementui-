<template>
  <div>
    <el-form :model="searchForm" label-width="100px">
      <el-form-item label="平台" id="vg-checkbox" :show-message="false">
        <el-checkbox-group v-model="searchForm.selectedPlatform">
          <el-checkbox
            v-for="(item, idx) in platform"
            :key="idx"
            :label="item.id"
            >{{ item.name }}</el-checkbox
          >
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="领域" id="vg-checkbox" :show-message="false">
        <el-checkbox-group v-model="domainAllSelect">
          <template v-for="(item, idx) in domain">
            <el-popover
              :key="idx"
              placement="bottom"
              width="200"
              trigger="hover"
              v-if="item.children"
            >
              <div>
                <el-checkbox-group v-model="domainAllSelect">
                  <el-checkbox
                    :label="item2.id"
                    v-for="(item2, idx2) in item.children"
                    :key="idx2"
                    @change="(val) => domain2Check(val, item, item2)"
                    >{{ item2.name }}
                  </el-checkbox>
                </el-checkbox-group>
              </div>
              <el-checkbox
                slot="reference"
                @change="(val) => domainCheck(val, item)"
                :key="idx"
                :label="item.id"
                >{{ item.name }}
              </el-checkbox>
            </el-popover>
            <el-checkbox
              v-else
              :key="idx"
              :label="item.id"
              @change="(val) => domainCheck(val, item)"
              >{{ item.name }}
            </el-checkbox>
          </template>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="精准匹配" id="vg-checkbox" :show-message="false">
        <el-cascader
          popper-class="skin_pop_cascader"
          v-model="searchForm.accurateCheckList"
          placeholder="精准匹配"
          :options="accurateCheckData"
          @change="accurateCheckEvent"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="账号人设" id="vg-checkbox" :show-message="false">
        <el-checkbox-group v-model="searchForm.selectedAccount">
          <el-checkbox
            v-for="(item, idx) in accountSetting"
            :key="idx"
            :label="item.id"
            >{{ item.name }}</el-checkbox
          >
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="内容形式" id="vg-checkbox" :show-message="false">
        <el-checkbox-group v-model="searchForm.selectedContentForm">
          <el-checkbox
            v-for="(item, idx) in contentForm"
            :key="idx"
            :label="item.id"
            >{{ item.name }}</el-checkbox
          >
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="数据要求" id="vg-checkbox" :show-message="false">
        <div class="data_request">
          <div v-popover:fanpop class="data_item">粉丝量</div>
          <div v-popover:interactpop class="data_item">互动数据</div>
          <div v-popover:offerpop class="data_item">报价</div>
        </div>

        <!-- 报价 -->
        <el-popover
          ref="offerpop"
          placement="bottom"
          width="460"
          trigger="click"
          v-model="popShow.showofferpop"
        >
          <div class="interactpop_content pop_content">
            <div
              class="interactpop_content_item"
              v-for="(item2, index) in searchForm.offerData"
              :key="index"
            >
              <div style="margin-right: 10px">报价类型</div>
              <el-select v-model="item2.type" placeholder="请选择">
                <el-option
                  v-for="item in offerOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <div style="margin: auto 10px">值范围</div>
              <input
                type="text"
                class="interactpop_item_inp"
                v-model="item2.num1"
              />
              <div>--</div>
              <input
                type="text"
                class="interactpop_item_inp"
                v-model="item2.num2"
              />
            </div>
            <el-button class="add_item" type="primary" @click="addInteract(2)"
              >+</el-button
            >
            <div class="inp_wrap_btn">确定</div>
          </div>
        </el-popover>
        <!-- 互动数据 -->
        <el-popover
          ref="interactpop"
          placement="bottom"
          width="460"
          trigger="click"
          v-model="popShow.showinteractpop"
        >
          <div class="interactpop_content pop_content">
            <div
              class="interactpop_content_item"
              v-for="(item2, index) in searchForm.interact"
              :key="index"
            >
              <div style="margin-right: 10px">数据类型</div>
              <el-select v-model="item2.type" placeholder="请选择">
                <el-option
                  v-for="item in interactOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <div style="margin: auto 10px">值范围</div>
              <input
                type="text"
                class="interactpop_item_inp"
                v-model="item2.num1"
              />
              <div>--</div>
              <input
                type="text"
                class="interactpop_item_inp"
                v-model="item2.num2"
              />
            </div>
            <el-button class="add_item" type="primary" @click="addInteract(1)"
              >+</el-button
            >
            <div class="inp_wrap_btn">确定</div>
          </div>
        </el-popover>
        <!--粉丝量-->
        <el-popover
          ref="fanpop"
          placement="bottom"
          width="150"
          v-model="popShow.showfanpop"
          trigger="click"
        >
          <div class="pop_content">
            <div class="inp_wrap">
              <div class="inp_wrap_label">最低</div>
              <input
                class="inp_wrap_inp"
                type="text"
                v-model="searchForm.fanNUm1"
              />
            </div>
            <div class="inp_wrap" style="margin-top: 10px">
              <div class="inp_wrap_label">最高</div>
              <input
                class="inp_wrap_inp"
                type="text"
                v-model="searchForm.fanNUm2"
              />
            </div>
            <div class="inp_wrap_btn" @click="selectBtn">确定</div>
          </div>
        </el-popover>
      </el-form-item>
      <el-form-item label="粉丝画像" id="vg-checkbox" :show-message="false">
        <div class="data_request">
          <div v-popover:sexpop class="data_item">性别占比</div>
          <div v-popover:agepop class="data_item">年龄段分布</div>
        </div>
        <!-- 年龄段分布 -->
        <el-popover
          ref="agepop"
          placement="bottom"
          width="460"
          v-model="popShow.showagepop"
          trigger="click"
        >
          <div class="interactpop_content pop_content">
            <div
              class="interactpop_content_item"
              v-for="(item2, index) in searchForm.agedistribute"
              :key="index"
            >
              <div style="margin-right: 10px">年龄段</div>
              <el-select v-model="item2.type" placeholder="请选择">
                <el-option
                  v-for="item in ageOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <div style="margin: auto 10px">值范围</div>
              <input
                type="text"
                class="interactpop_item_inp"
                v-model="item2.num1"
              />
              <div>--</div>
              <input
                type="text"
                class="interactpop_item_inp"
                v-model="item2.num2"
              />
            </div>
            <el-button class="add_item" type="primary" @click="addInteract(3)"
              >+</el-button
            >
            <div class="inp_wrap_btn">确定</div>
          </div>
        </el-popover>
        <!--性别占比-->
        <el-popover
          ref="sexpop"
          placement="bottom"
          width="300"
          v-model="popShow.showsexpop"
          trigger="click"
        >
          <div class="interactpop_content pop_content">
            <div class="interactpop_content_item">
              <div style="margin: auto 10px">男性</div>
              <input
                type="text"
                class="interactpop_item_inp"
                v-model="searchForm.man.num1"
              />
              <div>--</div>
              <input
                type="text"
                class="interactpop_item_inp"
                v-model="searchForm.man.num2"
              />
            </div>
            <div class="interactpop_content_item">
              <div style="margin: auto 10px">女性</div>
              <input
                type="text"
                class="interactpop_item_inp"
                v-model="searchForm.woman.num1"
              />
              <div>--</div>
              <input
                type="text"
                class="interactpop_item_inp"
                v-model="searchForm.woman.num2"
              />
            </div>
            <div class="inp_wrap_btn">确定</div>
          </div>
        </el-popover>
      </el-form-item>
      <el-form-item label="其他信息" id="vg-checkbox" :show-message="false">
        <div class="data_request">
          <div v-popover:babypop class="data_item">宝宝信息</div>
          <div v-popover:skinpop class="data_item">皮肤信息</div>
          <div v-popover:bloggerpop class="data_item">博主所在地</div>
        </div>
        <!-- 宝宝信息 -->
        <el-popover
          ref="babypop"
          placement="bottom"
          width="460"
          trigger="click"
          v-model="popShow.showbabypop"
        >
          <div class="interactpop_content pop_content">
            <div
              class="interactpop_content_item"
              v-for="(item2, index) in searchForm.babydistribute"
              :key="index"
            >
              <div style="margin-right: 10px">性别</div>
              <el-select v-model="searchForm.babyData.sex" placeholder="请选择">
                <el-option
                  v-for="item in sexOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <div style="margin: auto 10px">值范围</div>
              <input
                type="text"
                class="interactpop_item_inp"
                v-model="searchForm.babyData.num1"
              />
              <div>--</div>
              <input
                type="text"
                class="interactpop_item_inp"
                v-model="searchForm.babyData.num2"
              />
            </div>
            <div class="inp_wrap_btn">确定</div>
          </div>
        </el-popover>
        <!-- 皮肤信息 -->
        <el-popover
          ref="skinpop"
          placement="bottom"
          width="200"
          trigger="click"
          v-model="popShow.showskinpop"
        >
          <div class="interactpop_content pop_content">
            <el-cascader
              popper-class="skin_pop_cascader"
              v-model="searchForm.skinData"
              placeholder="试试搜索：指南"
              :options="skinOptions"
              :props="{ multiple: true }"
            ></el-cascader>
            <div class="inp_wrap_btn" @click="searchList">确定</div>
          </div>
        </el-popover>
        <!--博主所在地-->
        <el-popover
          ref="bloggerpop"
          placement="bottom"
          width="290"
          trigger="click"
          v-model="popShow.showbloggerpop"
        >
          <div class="pop_content">
            <div class="inp_wrap">
              <div class="inp_wrap_label flex_label">最近ip</div>
              <div>
                <el-cascader
                  size="mini"
                  :options="areaOptions"
                  v-model="searchForm.ipArea"
                  @change="ipChange"
                >
                </el-cascader>
              </div>
            </div>
            <div class="inp_wrap" style="margin-top: 10px">
              <div class="inp_wrap_label flex_label">常驻地址</div>
              <div>
                <el-cascader
                  size="mini"
                  :options="areaOptions"
                  v-model="searchForm.residentArea"
                  @change="residentChange"
                >
                </el-cascader>
              </div>
            </div>
            <div class="inp_wrap_btn">确定</div>
          </div>
        </el-popover>
      </el-form-item>
      <el-form-item label="辅助条件" id="vg-checkbox" :show-message="false">
        <div class="data_request contact_wrap">
          <el-radio-group v-model="searchForm.contact">
            <el-radio :label="1">有联系方式</el-radio>
            <el-radio :label="2">已建联</el-radio>
          </el-radio-group>
        </div>
      </el-form-item>
      <el-form-item label="辅助搜索" id="vg-checkbox" :show-message="false">
        <div class="data_request contact_wrap">
          <el-input
            v-model="searchForm.assistSearch"
            placeholder="请输入内容"
            class="assist_search_inp"
          ></el-input>
          <el-button @click="resetData">清空</el-button>
          <el-button type="primary" @click="searchBtn">确定</el-button>
          <el-button @click="uploadData" type="primary" icon="el-icon-download"
            >导出</el-button
          >
        </div>
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <el-popover ref="popover" placement="right" width="200" trigger="click">
      <el-tree
        :data="treeData"
        show-checkbox
        node-key="id"
        :default-checked-keys="checkedKeys"
        :props="defaultProps"
        @check="selectTree"
      >
      </el-tree>
    </el-popover>
    <!--    <el-button v-popover:popover>修改</el-button> -->
    <!-- <el-button @click="uploadData" type="primary">导出</el-button> -->
    <!-- <el-button @click="printData">打印</el-button> -->
    <!--//如果需要做控制表格列的展示效果可用v-if加上面注释掉的隐藏功能
      <el-table-column
        align="center"
        prop="address"
        label="地址"
        v-if="checkedKeys.includes('address')"
      >
      </el-table-column> -->
    <el-table :data="expertTable" border style="width: 100%" id="tableData2">
      <el-table-column
        align="center"
        prop="avatar_url"
        width="100"
        label="头像"
      >
        <template slot-scope="scope">
          <img width="50px" :src="scope.row.avatar_url" alt="" />
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="nickname"
        width="100"
        show-overflow-tooltip
        label="昵称"
      >
      </el-table-column>
      <el-table-column align="center" prop="type" width="100" label="平台">
        <template slot-scope="{ row }">
          <div>
            {{
              row.type == 1
                ? "小红书"
                : row.type == 2
                ? "抖音"
                : row.type == 3
                ? "微博"
                : row.type == 4
                ? "淘宝逛逛"
                : "--"
            }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        width="100"
        align="center"
        prop="id"
        label="平台ID"
        v-if="checkedKeys.includes('address')"
      >
      </el-table-column>
      <el-table-column
        width="150"
        align="center"
        prop="link"
        label="主页链接"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column align="center" prop="sex" width="100" label="性别">
        <template slot-scope="{ row }">
          <div>
            {{ row.sex == 1 ? "男" : "女" }}
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" width="100" prop="tags" label="领域">
        <template slot-scope="scope">
          <div>
            <el-popover
              ref="editDomainPop"
              placement="top"
              width="700"
              trigger="click"
              v-model="scope.row.editPopDomainShow"
            >
              <div id="vg-checkbox2">
                <el-checkbox-group v-model="editDomainAllSelect">
                  <template v-for="(item, idx) in domain">
                    <el-popover
                      :key="idx"
                      placement="bottom"
                      width="200"
                      trigger="hover"
                      v-if="item.children"
                    >
                      <div>
                        <el-checkbox-group v-model="editDomainAllSelect">
                          <el-checkbox
                            :label="item2.id"
                            v-for="(item2, idx2) in item.children"
                            :key="idx2"
                            @change="(val) => domain2Check(val, item, item2, 2)"
                            >{{ item2.name }}
                          </el-checkbox>
                        </el-checkbox-group>
                      </div>
                      <el-checkbox
                        slot="reference"
                        @change="(val) => domainCheck(val, item, 2)"
                        :key="idx"
                        :label="item.id"
                        >{{ item.name }}
                      </el-checkbox>
                    </el-popover>
                    <el-checkbox
                      v-else
                      :key="idx"
                      :label="item.id"
                      @change="(val) => domainCheck(val, item, 2)"
                      >{{ item.name }}
                    </el-checkbox>
                  </template>
                </el-checkbox-group>
              </div>
              <div slot="reference" class="data_item">
                {{ scope.row.tags }}
              </div>
              <div style="text-align: right">
                <el-button
                  type="primary"
                  size="mini"
                  @click="editTablePop(scope.$index)"
                  >确定</el-button
                >
              </div>
            </el-popover>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="accountSetting"
        width="100"
        label="账号人设"
      >
        <template slot-scope="{ row }">
          <div>
            <el-popover
              ref="editAccountSetPop"
              placement="top"
              width="700"
              trigger="click"
              v-model="row.editAccountSetShow"
            >
              <div id="vg-checkbox2">
                <el-checkbox-group v-model="editAccountSetting">
                  <el-checkbox
                    v-for="(item, idx) in accountSetting"
                    :key="idx"
                    :label="item.id"
                    >{{ item.name }}</el-checkbox
                  >
                </el-checkbox-group>
              </div>
              <div slot="reference" class="data_item">
                {{ row.accountSetting }}
              </div>
              <div style="text-align: right">
                <el-button type="primary" size="mini">确定</el-button>
              </div>
            </el-popover>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="contentForm"
        width="100"
        label="内容形式"
      >
        <template slot-scope="{ row }">
          <div>
            <el-popover
              ref="editContentFormPop"
              placement="top"
              width="700"
              trigger="click"
              v-model="row.editContentFormShow"
            >
              <div id="vg-checkbox2">
                <el-checkbox-group v-model="editContentForm">
                  <el-checkbox
                    v-for="(item, idx) in contentForm"
                    :key="idx"
                    :label="item.id"
                    >{{ item.name }}</el-checkbox
                  >
                </el-checkbox-group>
              </div>
              <div slot="reference" class="data_item">
                {{ row.contentForm }}
              </div>
              <div style="text-align: right">
                <el-button type="primary" size="mini">确定</el-button>
              </div>
            </el-popover>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="isDip"
        width="100"
        label="是否可探店"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="babyDes"
        label="宝宝信息"
        width="100"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="skin"
        label="皮肤特质/肤色/敏感肌"
        width="100"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        width="100"
        align="center"
        prop="nearNoteDate"
        label="最近发布笔记时间"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="fans"
        label="粉丝数"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column align="center" prop="liked" label="点赞数">
      </el-table-column>
      <el-table-column align="center" prop="collected" label="收藏数">
      </el-table-column>
      <el-table-column align="center" prop="follows" label="关注数">
      </el-table-column>

      <el-table-column
        align="center"
        prop="likeMean"
        label="点赞平均数（8篇-max-min）"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="collectMean"
        label="收藏平均数（8篇-max-min）"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="cmtMean"
        label="评论平均数（8篇-max-min）"
        v-if="checkedKeys.includes('address')"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="likeMid"
        label="点赞中位数（8篇-max-min）"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="collectMid"
        label="收藏中位数（8篇-max-min）"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="cmtMid"
        label="评论中位数（8篇-max-min）"
        v-if="checkedKeys.includes('address')"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="videoPlay"
        label="视频完播率"
        v-if="checkedKeys.includes('address')"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="article_report_price"
        label="图文报备报价"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="article_noreport_price"
        label="图文非报备报价"
      >
      </el-table-column
      ><el-table-column
        align="center"
        prop="article_collect_price"
        label="图文合集报价"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="video_report_price"
        label="视频报备报价"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="video_noreport_price"
        label="视频非报备报价"
      >
      </el-table-column
      ><el-table-column
        align="center"
        prop="video_collect_price"
        label="视频合集报价"
      >
      </el-table-column>
      <el-table-column align="center" prop="rebate" label="返点">
      </el-table-column>
      <el-table-column
        align="center"
        prop="new_price_date"
        label="最新报价时间"
      >
      </el-table-column>
      <el-table-column align="center" prop="otherRemark" label="其余备注">
      </el-table-column>
      <el-table-column
        align="center"
        prop="wechat_code"
        width="120"
        label="微信号"
      >
      </el-table-column>
      <el-table-column align="center" prop="phone" width="120" label="手机号">
      </el-table-column>
      <el-table-column
        align="center"
        prop="article_cpe"
        label="图文cpe报备/非报备"
        v-if="checkedKeys.includes('address')"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="video_cpe"
        label="视频cpe报备/非报备"
        v-if="checkedKeys.includes('address')"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="article_cpm"
        label="图文cpm报备/非报备"
        v-if="checkedKeys.includes('address')"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="video_cpm"
        label="视频cpm报备/非报备"
      >
      </el-table-column>
      <el-table-column align="center" prop="ip_site" label="最近ip地址">
      </el-table-column>
      <el-table-column align="center" prop="often_site" label="常驻地">
      </el-table-column>
      <el-table-column
        align="center"
        prop="fans_gender"
        width="200"
        show-overflow-tooltip
        label="粉丝性别分布"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="fans_cities"
        width="200"
        show-overflow-tooltip
        label="粉丝地域分布"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="fans_ages"
        width="200"
        show-overflow-tooltip
        label="粉丝年龄分布"
      >
      </el-table-column>
      <el-table-column align="center" prop="is_mcn" label="签约mcn">
      </el-table-column>
      <el-table-column align="center" prop="mcn_name" label="mcn名称">
      </el-table-column>
      <el-table-column
        align="center"
        prop="is_official_accounts"
        label="关注17.5公众号"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="is_mini"
        label="注册17.5小程序"
        v-if="checkedKeys.includes('address')"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="is_enterprise_mini"
        label="添加企业微信"
        v-if="checkedKeys.includes('address')"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="source"
        label="来源"
        v-if="checkedKeys.includes('address')"
      >
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="currentPage"
      :limit.sync="pageSize"
      @pagination="searchBtn"
    />
  </div>
</template>

<script>
import { searchData } from "@/api/resourceInte";
import Pagination from "@/components/pagination";
import { uploadElExcel } from "@/utils/util";
import { regionData, CodeToText } from "element-china-area-data";
import {
  contentForm,
  platform,
  domain,
  accountSetting,
  skinOptions,
  interactOptions,
  offerOptions,
  ageOptions,
  excelCommons,
  accurateCheckData,
} from "./listData";
export default {
  name: "ProjectOneIndex",
  components: {
    Pagination,
  },
  data() {
    return {
      currentPage: 1, //当前页数
      pageSize: 10, //每页显示条数
      total: 10, //总条数
      domainAllSelect: [], //筛选领域回显
      editDomainAllSelect: [], //修改领域
      popShow: {
        showfanpop: false,
        showinteractpop: false,
        showofferpop: false,
        showagepop: false,
        showsexpop: false,
        showbabypop: false,
        showskinpop: false,
        showbloggerpop: false,
      },
      /* 表单修改领域提交的数据 */
      editDomain: {
        selectedEditDomain: [], //领域
      },
      //表单修改账号人设的数据
      editAccountSetting: [],
      //表单内容形式
      editContentForm: [],
      searchForm: {
        accurateCheckList: [], //精准匹配
        assistSearch: "", //辅助搜索内容
        contact: "", //联系方式
        selectResidentArea: "", //选中常驻地址
        residentArea: [], //常驻地址代号
        selectIpArea: "", //选中的ip地址
        ipArea: [], //ip地址代号
        skinData: [], //皮肤数据
        selectedPlatform: [],
        selectedDomain: [], //领域
        selectedAccount: [], //账号人设
        selectedContentForm: [], //内容形式
        fanNUm1: "", //粉丝量最低
        fanNum2: "", //粉丝量最高
        /* 互动数据 */
        interact: [
          {
            type: "",
            num1: "",
            num2: "",
          },
        ],
        /* 报价数据 */
        offerData: [
          {
            type: "",
            num1: "",
            num2: "",
          },
        ],
        /* 年龄数据 */
        agedistribute: [
          {
            type: "",
            num1: "",
            num2: "",
          },
        ],
        /* 宝宝信息 */
        babydistribute: [
          {
            type: "",
            num1: "",
            num2: "",
          },
        ],
        /* 性别占比男 */
        man: {
          num1: "",
          num2: "",
        },
        /* 性别占比女 */
        woman: {
          num1: "",
          num2: "",
        },
        /* 宝宝data */
        babyData: {
          sex: "",
          num1: "",
          num2: "",
        },
      },
      /* 平台选择 */
      platform: platform,
      /* 领域选择 */
      domain: domain,
      /* 账号人设选择 */
      accountSetting: accountSetting,
      /* 内容形式 */
      contentForm: contentForm,
      /* 互动数据类型 */
      interactOptions: interactOptions,
      /* 报价类型 */
      offerOptions: offerOptions,
      /* 年龄段分布 */
      ageOptions: ageOptions,
      /* 宝宝信息的性别选择 */
      sexOptions: [
        {
          value: "1",
          label: "男性",
        },
        {
          value: "2",
          label: "女性",
        },
      ],
      /* 皮肤选择 */
      skinOptions: skinOptions,
      accurateCheckData: accurateCheckData,
      //地址选择器
      areaOptions: regionData,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      expertTable: [
        {
          editContentFormShow: false, //修改内容形式
          editAccountSetShow: false, //修改账号人设
          editPopDomainShow: false, //修改领域弹框显示
          //上面需要进行额外追加
          avatar_url:
            "https://sns-avatar-qc.xhscdn.com/avatar/62559031ddc2ed5650c711cc.jpg?imageView2/2/w/360/format/webp", //头像
          nickname: "霹雳小阿姨", //昵称
          type: "1", //1、小红书 2、抖音 3、微博 4、淘宝逛逛
          id: 8403, //平台id
          link: "https://www.xiaohongshu.com/user/profile/5e91ce650000000001007ee6", //主页链接
          sex: "1", //性别 1、男  2、女
          tags: "美妆博主", //领域
          accountSetting: "账号人设", //账号人设
          contentForm: "内容形式", //内容形式
          isDip: "1", //是否可探店
          babyDes: "宝宝信息", //宝宝信息
          skin: "皮肤方面", //皮肤特质
          nearNoteDate: "2021-10-9", //最近笔记时间
          fans: "999", //粉丝数
          liked: "999", //点赞数
          collected: "999", //收藏数
          follows: "999", //关注数
          likeMean: "999", //8篇点赞平均数
          collectMean: "999", //8篇收藏平均数
          cmtMean: "999", //8篇评论平均数
          likeMid: "999", //8篇点赞中位数
          collectMid: "999", //8篇收藏中位数
          cmtMid: "999", //8篇评论中位数
          videoPlay: "50%", //视频完播率
          article_report_price: "9.99", //图文报备报价
          article_noreport_price: "9.99", //图文非报备报价
          article_collect_price: "9.99", //图文合集报价
          video_report_price: "9.99", //视频报备报价
          video_noreport_price: "9.99", //视频非报备报价
          video_collect_price: "9.99", //视频合集报价
          rebate: "9.99", //返点
          new_price_date: "2022-10", //最新报价时间
          otherRemark: "其余备注", //其余备注
          wechat_code: "18736110883", //微信号
          phone: "18736110883", //手机号
          article_cpe: "99", //图文cpe
          video_cpe: "99", //视频cpe
          article_cpm: "99", //图文cpm
          video_cpm: "99", //视频cpm
          ip_site: "北京市-北京区", //ip地址
          often_site: "北京市-北京区", //常驻地
          fans_gender: "粉丝性别分布", //粉丝性别分布
          fans_cities: "粉丝地域分布", //粉丝地域分布
          fans_ages: "粉丝年龄占比", //粉丝年龄占比
          is_mcn: "1", //签约mcn
          mcn_name: "mcn名称", //mcn名称
          is_official_accounts: "关注17.5公众号", //关注17.5公众号
          is_mini: "关注17.5小程序", //关注17.5小程序
          is_enterprise_mini: "添加企业微信", //添加企业微信
          source: "1", //来源：1 公众号录入 2莓果库 3资源库
        },
        {
          editAccountSetShow: false, //修改账号人设
          editPopDomainShow: false, //修改领域弹框显示
          id: 8403,
          userid: "5e91ce650000000001007ee6",
          red_id: "99080417L",
          tags: "美妆博主;",
          images:
            "https://sns-avatar-qc.xhscdn.com/avatar/62559031ddc2ed5650c711cc.jpg?imageView2/2/w/360/format/webp",
          collected: 44948,
          desc: "美妆护肤🧏🏻\u200d♀️\n好物分享🎁\n生活居家🏡\n📮939958538@qq.com",
          fans: 14725,
          follows: 569,
          gender: "女",
          level: "金冠薯",
          liked: 93841,
          location: "",
          nickname: "霹雳小阿姨",
          share_link:
            "https://www.xiaohongshu.com/user/profile/5e91ce650000000001007ee6",
          note_num_stat_posted: 51,
          note_num_stat_liked: 93841,
          note_num_stat_collected: 44948,
          identity_deeplink:
            "xhsdiscover://rn/app-settings/official/certification/details?type=2&user_id=5e91ce650000000001007ee6&is_mcn=false",
          ip_location: "湖北",
          brand_account_info: "",
          red_official_verify_content: "",
          status: null,
          phone: "",
          email: "939958538@qq.com、",
          vx: "",
          likeMean: 4,
          collectMean: 1,
          cmtMean: 117,
          hudongMean: 122,
          likeMid: 4,
          collectMid: 1,
          cmtMid: 117,
          hudongMid: 122,
          interaction: 138789,
          readMid: 1069,
          readMean: 1069,
          fans_cities:
            "北京: 3.0%,广州: 2.1%,深圳: 2.0%,上海: 1.9%,重庆: 1.8%,武汉: 1.4%,天津: 1.4%,青岛: 1.3%,保定: 1.3%",
          fans_gender: "female: 90.2%,male: 9.8%",
          fans_ages:
            "<18: 42.5%,18-24: 20.9%,35-44: 15.9%,25-34: 12.2%,>44: 8.5%",
          fansIncreaseNum: -37,
          videoFullViewRate: "0.0",
          vg_article_price: 150,
          vg_video_price: 300,
          vg_phone: "19921279585",
          vg_wechat_code: "19921279585",
        },
      ],
      checkedKeys: ["date", "name", "address"], //选中的树结构
      treeData: [
        {
          id: "date",
          label: "日期",
        },
        {
          id: "name",
          label: "名字",
        },
        {
          id: "address",
          label: "地址",
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  watch: {
    expertTable: {
      handler(newVal, oldVal) {
        console.log(newVal, oldVal);
        this.editDomainAllSelect = [];
        this.editDomain.selectedEditDomain = [];
        this.editAccountSetting = [];
        this.editContentForm = [];
      },
      deep: true,
    },
  },
  mounted() {},

  methods: {
    accurateCheckEvent(value) {
      console.log(value);
    },
    /* 表格中修改数据 */
    editTablePop(trIndex) {
      console.log("trIndex: ", trIndex);
      /* 修改提交领域数据  区分其他 */
      let newSelectedDomain = this.editDomain.selectedEditDomain.map((item) => {
        /* 这一步是因为这里是对象数组避免修改原数组  回显的时候需要做出额外拼接 */
        let obj = { ...item };
        if (obj.ppid && obj.ppid.length > 0) {
          obj.ppid = obj.ppid.map((item2) => {
            if (item2.includes("其他")) {
              item2 = "其他";
            }
            return item2;
          });
        }
        return obj;
      });
      console.log(newSelectedDomain);
      console.log(
        "this.editDomain.selectedEditDomain: ",
        this.editDomain.selectedEditDomain
      );

      /* this.expertTable[trIndex].editPopDomainShow=false
      this.expertTable[trIndex].editAccountSetting=false
      this.expertTable[trIndex].editContentForm=false */
    },
    /* 筛选领域的2级菜单 */
    domain2Check(value, item, item2, type) {
      let str1 = "";
      let str2 = "";
      let str3 = "";
      /*  console.log("str: ", this[`${str1}`][`${str2}`]); */
      /* type==2是修改  */
      if (type == 2) {
        str1 = "editDomain";
        str2 = "selectedEditDomain";
        str3 = "editDomainAllSelect";
      } else {
        str1 = "searchForm";
        str2 = "selectedDomain";
        str3 = "domainAllSelect";
      }
      /* value为true是选中 */
      if (value) {
        let arr = [...this[`${str1}`][`${str2}`]];
        let status = true;
        arr.map((it) => {
          if (it.pid == item.id) {
            if (it.ppid && it.ppid.length > 0) {
              it.ppid.push(item2.id);
            } else {
              it.ppid = [item2.id];
            }
            status = false;
          }
          return it;
        });
        if (status) {
          this[`${str3}`] = [...this[`${str3}`], item.id];
          let obj = {
            pid: item.id,
            ppid: [item2.id],
          };
          arr.push(obj);
        }
        this[`${str1}`][`${str2}`] = arr;
      } else {
        let arr = this[`${str1}`][`${str2}`];
        arr.map((it) => {
          if (it.pid == item.id) {
            it.ppid = it.ppid.filter((itt) => {
              return itt != item2.id;
            });
            if (it.ppid.length == 0) {
              let status = this[`${str3}`].some((it2) => {
                return it2 == it.pid;
              });
              if (!status) {
                this[`${str3}`] = [...this[`${str3}`], it.pid];
              }
              delete it.ppid;
            }
          }
          return it;
        });
        this[`${str1}`][`${str2}`] = arr;
      }
      console.log(
        "this.editDomain.selectedEditDomain: ",
        this.editDomain.selectedEditDomain
      );
      console.log(
        " this.searchForm.selectedDomain: ",
        this.searchForm.selectedDomain
      );
    },
    /* 筛选领域的1级菜单 */
    domainCheck(value, item, type) {
      let str1 = "";
      let str2 = "";
      let str3 = "";
      /*  console.log("str: ", this[`${str1}`][`${str2}`]); */
      /* type==2是修改  */
      if (type == 2) {
        str1 = "editDomain";
        str2 = "selectedEditDomain";
        str3 = "editDomainAllSelect";
      } else {
        str1 = "searchForm";
        str2 = "selectedDomain";
        str3 = "domainAllSelect";
      }
      /* value为true是添加false是取消*/
      if (value) {
        let arr = [...this[`${str1}`][`${str2}`]];
        let status = true;
        arr.forEach((it) => {
          if (it.pid == item.id) {
            status = false;
          }
        });
        if (status) {
          let obj = {
            pid: item.id,
          };
          arr.push(obj);
        }
        this[`${str1}`][`${str2}`] = arr;
      } else {
        /* 判断当有子集存在父级不可取消 */
        this[`${str1}`][`${str2}`].forEach((it) => {
          if (it.ppid && it.pid == item.id) {
            this[`${str3}`].push(item.id);
          }
        });
        /* 过滤取消 */
        let arr = this[`${str1}`][`${str2}`].filter((it) => {
          if (!it.ppid) {
            return it.pid != item.id;
          } else {
            return it;
          }
        });
        this[`${str1}`][`${str2}`] = arr;
      }
    },
    printData() {
      this.printExcel("tableData");
    },
    /* 打印 */
    printExcel(id) {
      // 空页面
      let printStr =
        "<html><head><meta http-equiv='Content-Type' content='text/html; charset=utf-8'></head>";
      // 定义element-ui table组件的样式
      const tabStyle = `<style>
                table{width:100%;display:table-cell!important;box-sizing:border-box;}
                .el-table__header,.el-table__body,.el-table__footer{width:100%!important;border-collapse: collapse;text-align:center;}
                table,table tr th, table tr td { border:1px solid #ddd;color:#606266;word-wrap:break-word}
                table tr th,table tr td{padding:4mm 0mm;word-wrap:break-word }
                .el-table__body, tr td .cell{width:100%!important}
                .el-table th.gutter{display: none;}
                .el-table colgroup.gutter{display: none;}
                .el-table th.gutter{display: table-cell!important;}
                </style><body>`;
      let content = "";
      // 获取名为传入id的 dom元素内的内容
      console.log(id);
      let str = document.getElementById(id).innerHTML;
      // 拼接空页面+style样式+dom内容
      content = content + str;
      printStr = printStr + tabStyle + content + "</body></html>";
      // 打开新页面
      let pwin = window.open("_blank");
      // 将内容赋值到新页面
      pwin.document.write(printStr);
      pwin.document.close();
      // 聚焦-不加focuse，在某些情况下，打印页面会有问题。
      pwin.focus();
      // 使用setTimeout，等页面dom元素渲染完成后再打印。
      setTimeout(() => {
        pwin.print(); // 打印功能。 例如 window.print() 直接打印当前整个页面。
        pwin.close(); // 关闭 打印创建的当前页面
      }, 500);
    },
    /* 前端导出表格 */
    uploadData() {
      let commons = [];
      /*
    //可配合筛选进行筛选固定列进行导出  
     this.checkedKeys.forEach((item) => {
        let title = "";
        switch (item) {
          case "date":
            title = "日期";
            break;
        }
        let obj = {
          title,
          key: item,
          type: "text",
        };
        commons.push(obj);
      }); */

      commons = excelCommons;
      /* 导出表格的时候对npm包做了修改进行实现兼容  部分commons是img类型但是是text空的情况 */
      uploadElExcel(commons, this.expertTable);
    },
    /* 树结构 */
    selectTree(data, selectData) {
      this.checkedKeys = selectData.checkedKeys;
    },
    selectBtn() {
      this.popShow = {
        showfanpop: false,
        showinteractpop: false,
        showofferpop: false,
        showagepop: false,
        showsexpop: false,
        showbabypop: false,
        showskinpop: false,
        showbloggerpop: false,
      };
    },
    /* 格式化提交数据 */
    subFormatData() {
      let {accurateCheckList} = this.searchForm
      let obj = {};
      /* 修改提交领域数据  区分其他 */
      let newSelectedDomain = this.searchForm.selectedDomain.map((item) => {
        /* 这一步是因为这里是对象数组避免修改原数组  回显的时候需要做出额外拼接 */
        let obj = { ...item };
        if (obj.ppid && obj.ppid.length > 0) {
          obj.ppid = obj.ppid.map((item2) => {
            if (item2.includes("其他")) {
              item2 = "其他";
            }
            return item2;
          });
        }
        return obj;
      });

      obj.newSelectedDomain = newSelectedDomain;
      console.log(accurateCheckList);
      console.log('obj: ', obj);
      return obj;
    },
    /* 搜索数据 */
    searchBtn() {
      this.subFormatData();
      searchData().then((res) => {
        console.log(res);
      });
    },
    /* 清空数据 */
    resetData() {
      this.domainAllSelect = []; //筛选领域回显
      this.editDomainAllSelect = []; //修改领域
      this.popShow = {
        showfanpop: false,
        showinteractpop: false,
        showofferpop: false,
        showagepop: false,
        showsexpop: false,
        showbabypop: false,
        showskinpop: false,
        showbloggerpop: false,
      };
      /* 表单修改领域提交的数据 */
      (this.editDomain = {
        selectedEditDomain: [], //领域
      }),
        //表单修改账号人设的数据
        (this.editAccountSetting = []);
      //表单内容形式
      this.editContentForm = [];
      this.searchForm = {
        accurateCheckList: [], //精准匹配
        assistSearch: "", //辅助搜索内容
        contact: "", //联系方式
        selectResidentArea: "", //选中常驻地址
        residentArea: [], //常驻地址代号
        selectIpArea: "", //选中的ip地址
        ipArea: [], //ip地址代号
        skinData: [], //皮肤数据
        selectedPlatform: [],
        selectedDomain: [], //领域
        selectedAccount: [], //账号人设
        selectedContentForm: [], //内容形式
        fanNUm1: "", //粉丝量最低
        fanNum2: "", //粉丝量最高
        /* 互动数据 */
        interact: [
          {
            type: "",
            num1: "",
            num2: "",
          },
        ],
        /* 报价数据 */
        offerData: [
          {
            type: "",
            num1: "",
            num2: "",
          },
        ],
        /* 年龄数据 */
        agedistribute: [
          {
            type: "",
            num1: "",
            num2: "",
          },
        ],
        /* 宝宝信息 */
        babydistribute: [
          {
            type: "",
            num1: "",
            num2: "",
          },
        ],
        /* 性别占比男 */
        man: {
          num1: "",
          num2: "",
        },
        /* 性别占比女 */
        woman: {
          num1: "",
          num2: "",
        },
        /* 宝宝data */
        babyData: {
          sex: "",
          num1: "",
          num2: "",
        },
      };
    },
    /* 
      //区域码转汉字
      let arr=[]
      arr.push(TextToCode['山西省'].code,TextToCode['山西省']['长治市'].code)
      console.log('arr: ', arr);
       */
    ipChange() {
      var loc = [];
      for (let i = 0; i < this.searchForm.ipArea.length; i++) {
        loc.push(CodeToText[this.searchForm.ipArea[i]]);
      }
      this.searchForm.selectIpArea = loc;
    },
    residentChange() {
      var loc = "";
      for (let i = 0; i < this.searchForm.residentArea.length; i++) {
        loc += CodeToText[this.searchForm.residentArea[i]];
      }
      console.log(this.searchForm.residentArea);
      this.searchForm.selectResidentArea = loc;
    },
    searchList() {
      console.log("this.searchForm.skinData: ", this.searchForm.skinData);
    },
    addInteract(type) {
      /* type 1是互动数据 2是报价 */
      if (type == 1) {
        this.searchForm.interact.push({
          type: "",
          num1: "",
          num2: "",
        });
      } else if (type == 2) {
        this.searchForm.offerData.push({
          type: "",
          num1: "",
          num2: "",
        });
      } else if (type == 3) {
        this.searchForm.agedistribute.push({
          type: "",
          num1: "",
          num2: "",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.interactpop_content {
  .add_item {
    width: 100%;
    height: 20px;
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .interactpop_content_item {
    display: flex;
    align-items: center;
    margin-top: 10px;
    &:nth-child(1) {
      margin-top: 0;
    }
    /deep/ .el-input {
      width: 100px;
      .el-input__inner {
        height: 20px;
      }
      .el-input__icon {
        line-height: 20px;
      }
    }
    .interactpop_item_inp {
      width: 100px;
    }
  }
}
.contact_wrap {
  display: flex;
  align-items: center;
  height: 30px;
  padding-left: 10px;
  .assist_search_inp {
    width: 200px;
    margin-right: 10px;
  }
}
.data_request {
  display: flex;
  color: #606266;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  margin-right: 30px;
  .data_item {
    margin-left: 10px;
    margin-right: 10px;
  }
}
.pop_content {
  .inp_wrap {
    display: flex;
    .flex_label {
      display: flex;
      align-items: center;
    }
    .inp_wrap_label {
      width: 20%;
    }
    .inp_wrap_inp {
      width: 100px;
    }
  }
  .inp_wrap_btn {
    margin-top: 10px;
    width: 100%;
    text-align: right;
    color: blue;
    cursor: pointer;
  }
}
/deep/ .el-form-item {
  margin-bottom: 10px;
  .el-form-item__label {
    line-height: 30px;
    font-weight: bold;
  }
  .el-form-item__content {
    line-height: 30px;
  }
}
/deep/ #vg-checkbox {
  .el-checkbox-group {
    margin-right: -10px;
    margin-bottom: -10px;
    overflow: hidden;

    .el-checkbox {
      position: relative;
      margin-right: 10px;
      margin-bottom: 10px;

      .el-checkbox__input {
        display: none;
      }
    }
  }
}
</style>
<style lang="scss">
#vg-checkbox2 {
  .el-checkbox-group {
    margin-right: -10px;
    margin-bottom: -10px;
    overflow: hidden;

    .el-checkbox {
      position: relative;
      margin-right: 10px;
      margin-bottom: 10px;

      .el-checkbox__input {
        display: none;
      }
    }
  }
}
.skin_pop_cascader {
  .el-cascader-menu:nth-child(1) {
    .el-checkbox {
      display: none !important;
    }
  }
}
</style>